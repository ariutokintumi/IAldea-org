const { pool } = require('../../kernel/db');
const { generateEmbedding } = require('../../ingesta/embedder');

class BaseSubagent {
  constructor(domain, minAccessLevel) {
    this.domain = domain;
    this.minAccessLevel = minAccessLevel;
  }

  /**
   * Llama al Búnker especificando el nivel de la llave necesaria
   */
  async callConmutador(ciphertext, level) {
    try {
      const response = await fetch('http://127.0.0.1:3005/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ciphertext, 
          level: `L${level}` // Envía 'L1', 'L2' o 'L3'
        })
      });
      const data = await response.json();
      if (data.error) return `[RESTRINGIDO: ${data.error}]`;
      return data.plaintext || "[ERROR DE INTEGRIDAD]";
    } catch (err) {
      return "[BÚNKER DE SEGURIDAD OFFLINE]";
    }
  }

  async query(userQuery, requesterAccessLevel) {
    // 1. Filtro de Rol (Software)
    if (requesterAccessLevel < this.minAccessLevel) {
      return `ACCESO DENEGADO: Tu rol no permite consultar el dominio ${this.domain}.`;
    }

    const embedding = await generateEmbedding(userQuery);
    if (!embedding) return "Error de conexión con el Kernel.";

    // 2. Consulta al Kernel
    const res = await pool.query(`
      SELECT c.content, v.source_name, v.sensitivity
      FROM document_chunks c
      JOIN document_versions v ON c.version_id = v.id
      WHERE v.sensitivity <= $2 
      AND (v.source_name ILIKE $3 OR c.content ILIKE $3)
      ORDER BY c.embedding <=> $1
      LIMIT 3
    `, [`[${embedding.join(',')}]`, requesterAccessLevel, `%${this.domain}%`]);

    const results = [];
    for (const row of res.rows) {
      // 3. Filtro Matemático (Cifrado por Nivel)
      // Se le pide al búnker descifrar con la llave del nivel específico del documento
      const decrypted = await this.callConmutador(row.content, row.sensitivity);
      results.push(`[FTE: ${row.source_name}] [CONFIDENCIALIDAD: L${row.sensitivity}] ${decrypted}`);
    }

    return results.length > 0 
      ? `INFORMACIÓN DE ${this.domain.toUpperCase()}:\n\n${results.join('\n\n')}`
      : `No se encontró información relevante sobre ${this.domain} en la memoria autorizada.`;
  }
}

module.exports = BaseSubagent;
