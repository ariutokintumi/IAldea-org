const { testConnection } = require('./db');

async function main() {
  console.log('🚀 Iniciando Kernel de IAldea...');
  await testConnection();
}

if (require.main === module) {
  main();
}

module.exports = {
  // Aquí exportaremos las herramientas de consulta y escritura del Kernel
};
