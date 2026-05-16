const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ialdea_db',
  password: process.env.DB_PASSWORD || 'ialdea2026',
  port: process.env.DB_PORT || 5432,
});

/**
 * Función para probar la conexión con la DB
 */
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa al Kernel de IAldea:', res.rows[0].now);
    return true;
  } catch (err) {
    console.error('❌ Error conectando al Kernel:', err.message);
    return false;
  }
}

module.exports = {
  pool,
  testConnection,
};
