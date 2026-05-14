const { pool } = require('../packages/kernel/db');
const crypto = require('crypto');

/**
 * Registra un nuevo usuario en la base de datos de IAldea.
 */
async function registerUser(phone, roleSlug, accessLevel) {
  const phoneHash = crypto.createHash('sha256').update(phone).digest('hex');
  
  console.log(`👤 Registrando usuario: ${phone}`);
  console.log(`🔐 Hash generado: ${phoneHash}`);

  try {
    await pool.query(`
      INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (channel_ref_hash) DO UPDATE 
      SET role_slug = EXCLUDED.role_slug, access_level = EXCLUDED.access_level
    `, [phone, phoneHash, roleSlug, accessLevel, 'ia_01']);

    console.log(`✅ Usuario registrado con éxito como ${roleSlug} (Nivel ${accessLevel})`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error registrando usuario:', err.message);
    process.exit(1);
  }
}

// Ejemplo de uso: node scripts/register_user.js 5215512345678 ciudadano 1
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Uso: node scripts/register_user.js <telefono> <rol> <nivel>');
} else {
  registerUser(args[0], args[1], parseInt(args[2]));
}
