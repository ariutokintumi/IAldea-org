const { ethers } = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Servicio de Anclaje en eVVM (Virtual Blockchain)
 */
class TrustLayer {
  constructor() {
    if (!process.env.EVVM_RPC_URL) {
      this.enabled = false;
      return;
    }
    
    this.enabled = true;
    this.provider = new ethers.JsonRpcProvider(process.env.EVVM_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.EVVM_PRIVATE_KEY, this.provider);
  }

  /**
   * Ancla un hash de contenido en la blockchain.
   * En este MVP, usamos el campo 'data' de una transacción para persistir el hash.
   */
  async anchorHash(contentHash) {
    if (!this.enabled) {
      console.warn('⚠️ eVVM no configurado. Saltando anclaje.');
      return { txHash: 'mock_tx_hash', status: 'skipped' };
    }

    try {
      console.log(`⛓️ Anclando hash en eVVM: ${contentHash}`);
      
      // Creamos una transacción hacia nosotros mismos (self-transaction)
      // El contentHash viaja en el campo 'data' (convertido a Hex)
      const tx = await this.wallet.sendTransaction({
        to: this.wallet.address,
        data: ethers.hexlify(ethers.toUtf8Bytes(`IALDEA-ANCHOR:${contentHash}`)),
        value: 0
      });

      const receipt = await tx.wait();
      console.log(`✅ Anclaje exitoso. Tx: ${receipt.hash}`);
      
      return {
        txHash: receipt.hash,
        chainId: (await this.provider.getNetwork()).chainId.toString(),
        status: 'anchored'
      };
    } catch (error) {
      console.error('❌ Error en el anclaje eVVM:', error.message);
      throw error;
    }
  }

  /**
   * Verifica si un hash local coincide con el registrado en una transacción.
   */
  async verifyAnchor(txHash, expectedHash) {
    if (!this.enabled) return true;

    try {
      const tx = await this.provider.getTransaction(txHash);
      const decodedData = ethers.toUtf8String(tx.data);
      const registeredHash = decodedData.split('IALDEA-ANCHOR:')[1];
      
      return registeredHash === expectedHash;
    } catch (error) {
      console.error('❌ Error verificando anclaje:', error.message);
      return false;
    }
  }
}

module.exports = new TrustLayer();
