const { parseDocument } = require('./parser');
const { chunkText } = require('./chunker');
const { generateEmbedding } = require('./embedder');
const { pool } = require('../kernel/db');
const crypto = require('crypto');

/**
 * Proceso principal de ingesta:
 * Documento -> Texto -> Chunks -> Embeddings -> DB
 */
async function ingestFile(filePath, metadata) {
  const { title, category, contributor_handle, sensitivity } = metadata;

  console.log(`📥 Procesando: ${title} (${category})...`);

  try {
    // 1. Extraer texto
    const text = await parseDocument(filePath);
    const contentHash = crypto.createHash('sha256').update(text).digest('hex');

    // 2. Crear registro de documento y versión en la DB
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insertar Documento
      const docRes = await client.query(
        'INSERT INTO documents (title, uri, category) VALUES ($1, $2, $3) RETURNING id',
        [title, filePath, category]
      );
      const docId = docRes.rows[0].id;

      // Insertar Versión
      const versionRes = await client.query(
        'INSERT INTO document_versions (document_id, version_number, content_hash, contributor_handle, sensitivity) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [docId, 1, contentHash, contributor_handle, sensitivity]
      );
      const versionId = versionRes.rows[0].id;

      // 3. Generar Chunks e Insertar con Embeddings
      const chunks = chunkText(text);
      console.log(`✂️  Texto dividido en ${chunks.length} fragmentos.`);

      for (let i = 0; i < chunks.length; i++) {
        const embedding = await generateEmbedding(chunks[i]);
        
        await client.query(
          'INSERT INTO document_chunks (version_id, content, embedding, chunk_index) VALUES ($1, $2, $3, $4)',
          [versionId, chunks[i], embedding ? `[${embedding.join(',')}]` : null, i]
        );
      }

      await client.query('COMMIT');
      console.log(`✅ Ingesta completada con éxito. ID Documento: ${docId}`);
      return docId;

    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release();
    }

  } catch (err) {
    console.error('❌ Error en el proceso de ingesta:', err.message);
    throw err;
  }
}

module.exports = {
  ingestFile,
};
