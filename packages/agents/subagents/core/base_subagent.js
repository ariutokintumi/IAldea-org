const { pool } = require('../../../kernel/db');
const { generateEmbedding } = require('../../../ingesta/embedder');

/**
 * BaseSubagent V2: Auditor de Fuentes y Jerarquía de Confianza
 */
class BaseSubagent {
  constructor(domain, minAccessLevel) {
    this.domain = domain;
    this.minAccessLevel = minAccessLevel;
  }

  /** Llave Conmutador (L1–L3) alineada a sensitivity del documento */
  sensitivityToKeyLevel(sensitivity) {
    const s = String(sensitivity || '').toLowerCase();
    if (s === 'confidential') return 2;
    if (s === 'private') return 3;
    return 1;
  }

  async callConmutador(ciphertext, keyLevelNum) {
    const parts = String(ciphertext || '').split(':');
    if (parts.length !== 3) {
      return ciphertext;
    }
    try {
      const base = process.env.CONMUTADOR_URL || 'http://127.0.0.1:3005';
      const level = `L${keyLevelNum}`;
      const response = await fetch(`${base.replace(/\/$/, '')}/decrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ciphertext, level })
      });
      const data = await response.json();
      return data.plaintext || "[ERROR DE INTEGRIDAD]";
    } catch (err) {
      return "[BÚNKER DE SEGURIDAD OFFLINE]";
    }
  }

  /**
   * Genera el mensaje según la jerarquía de Trust (Sección 8 de docs/memory/Source-hierarchy.md)
   */
  formatResult(decrypted, trust, source) {
    let tag = "[HECHO]";
    let warning = "";

    if (trust >= 4) {
      tag = "[INFERENCIA]";
      warning = "\n⚠️ [ADVERTENCIA: Esta fuente tiene menor nivel de certeza. Se requiere verificación humana.]";
    } else if (trust === 3) {
      tag = "[HECHO POR CONFIRMAR]";
    }

    return `${tag} [FTE: ${source}] [CONFIANZA: T${trust}] ${decrypted}${warning}`;
  }

  async query(userQuery, requesterAccessLevel) {
    if (requesterAccessLevel < this.minAccessLevel) {
      return `ACCESO DENEGADO: Tu rol no permite consultar el dominio ${this.domain}. [FUENTES RESTRINGIDAS]`;
    }

    const embedding = await generateEmbedding(userQuery);
    if (!embedding) return "Error de conexión con el Kernel.";

    const vecLiteral = `[${embedding.join(',')}]`;
    const res = await pool.query(
      `
      SELECT c.content,
             COALESCE(NULLIF(TRIM(d.title), ''), NULLIF(TRIM(d.uri), ''), 'documento') AS source_name,
             v.sensitivity,
             CASE LOWER(v.sensitivity)
               WHEN 'public' THEN 1
               WHEN 'confidential' THEN 2
               WHEN 'private' THEN 3
               ELSE 4
             END AS trust_level
      FROM document_chunks c
      JOIN document_versions v ON c.version_id = v.id
      JOIN documents d ON v.document_id = d.id
      WHERE (
        ($2::int >= 3 AND LOWER(v.sensitivity) IN ('public', 'confidential', 'private')) OR
        ($2::int = 2 AND LOWER(v.sensitivity) IN ('public', 'confidential')) OR
        ($2::int = 1 AND LOWER(v.sensitivity) = 'public')
      )
      AND (
        d.title ILIKE $3 OR d.category ILIKE $3 OR d.uri ILIKE $3 OR c.content ILIKE $3
      )
      ORDER BY trust_level ASC, (c.embedding <=> $1::vector) NULLS LAST
      LIMIT 3
    `,
      [vecLiteral, requesterAccessLevel, `%${this.domain}%`]
    );

    if (res.rows.length === 0) {
      return `No encontré una fuente suficientemente confiable para responder esto como hecho sobre ${this.domain}.`;
    }

    // Lógica de Contradicción (Sección 8)
    const distinctTrusts = new Set(res.rows.map(r => r.trust_level));
    let finalOutput = `--- INFORMACIÓN DE ${this.domain.toUpperCase()} ---\n`;
    
    if (distinctTrusts.size > 1 && res.rows[0].trust_level === res.rows[1].trust_level) {
      finalOutput += "\n⚠️ [ALERTA: Encontré fuentes verificables que se contradicen sobre este tema. Muestro ambas para transparencia.]\n";
    }

    for (const row of res.rows) {
      const keyLevel = this.sensitivityToKeyLevel(row.sensitivity);
      const decrypted = await this.callConmutador(row.content, keyLevel);
      finalOutput += `\n${this.formatResult(decrypted, row.trust_level, row.source_name)}`;
    }

    return finalOutput;
  }
}

module.exports = BaseSubagent;
