const { pool } = require('../../kernel/db');
const { generateEmbedding } = require('../../ingesta/embedder');

class BaseSubagent {
  constructor(domain, minAccessLevel) {
    this.domain = domain;
    this.minAccessLevel = minAccessLevel;
  }

  /**
   * Pide al Conmutador (Black Box) que descifre la info
   */
  async callConmutador(ciphertext) {
    try {
      const response = await fetch('http://127.0.0.1:3005/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ciphertext })
      });
      const data = await response.json();
      return data.plaintext || "[ERROR DE DESCIFRADO]";
    } catch (err) {
      return "[CONMUTADOR OFFLINE]";
    }
  }

  async query(userQuery, requesterAccessLevel) {
    if (requesterAccessLevel < this.minAccessLevel) {
      return `ACCESO DENEGADO: No tienes permiso para consultar el dominio de ${this.domain}.`;
    }

    const embedding = await generateEmbedding(userQuery);
    if (!embedding) return "Error de conexión con el Kernel.";

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
      // LLAMADA AL BÚNKER: El subagente no descifra solo, pide permiso al Conmutador
      const decrypted = await this.callConmutador(row.content);
      results.push(`[FTE: ${row.source_name}] [CONFIDENCIALIDAD: L${row.sensitivity}] ${decrypted}`);
    }

    return results.length > 0 
      ? `INFORMACIÓN DE ${this.domain.toUpperCase()}:\n\n${results.join('\n\n')}`
      : `No se encontró información relevante sobre ${this.domain} en la memoria autorizada.`;
  }
}

module.exports = BaseSubagent;
