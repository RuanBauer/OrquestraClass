const mongoose = require('mongoose');

module.exports = async function connectDB(uri) {
  try {
    if (!uri) throw new Error('MONGODB_URI não fornecida');
    await mongoose.connect(uri, { dbName: 'OrquestraDB' });
    console.log('🔥 MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar:', err);
  }
};
