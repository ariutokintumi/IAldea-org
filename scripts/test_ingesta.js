const { ingestFile } = require('../packages/ingesta');

async function test() {
  const metadata = {
    title: 'Acta de Asamblea Comunitaria - IAldea',
    category: 'acta',
    contributor_handle: 'admin_root',
    sensitivity: 'public'
  };

  try {
    // Asegurarse de que exista el administrador en la DB para las relaciones
    const { pool } = require('../packages/kernel/db');
    await pool.query(`
      INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (contributor_handle) DO NOTHING
    `, ['admin_root', '0000000000000000', 'admin_tecnico', 3, 'ia_01']);

    await ingestFile('./data/test/acta_comunitaria.md', metadata);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
