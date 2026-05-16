const crypto = require('crypto');
const { pool } = require('../kernel/db');

/**
 * Gestiona la identidad soberana y privacidad de los vecinos
 */
class IdentityManager {
  /**
   * Genera un hash ciego para el ID del canal (Teléfono o Telegram ID)
   */
  getChannelHash(rawId) {
    return crypto.createHash('sha256').update(rawId).digest('hex');
  }

  /**
   * Valida si un vecino existe o lo registra automáticamente como L1
   */
  async getOrRegisterUser(rawId, channelName) {
    const channelHash = this.getChannelHash(rawId);
    
    let res = await pool.query(
      'SELECT role_slug, access_level FROM memberships WHERE channel_ref_hash = $1',
      [channelHash]
    );

    if (res.rows.length === 0) {
      console.log(`✨ [IDENTITY] Nuevo registro automático (${channelName}): ${rawId}`);
      const contributorHandle = `${channelName.slice(0,2)}_${rawId.split('@')[0]}`;
      
      const newRecord = await pool.query(
        'INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id) VALUES ($1, $2, $3, $4, $5) RETURNING role_slug, access_level',
        [contributorHandle, channelHash, 'ciudadano', 1, 'ia_01']
      );
      return newRecord.rows[0];
    }

    return res.rows[0];
  }
}

module.exports = new IdentityManager();
