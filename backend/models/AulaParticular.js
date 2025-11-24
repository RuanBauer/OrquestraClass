const mongoose = require('mongoose');

const aulaParticularSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date },
  status: { type: String, enum: ['pendente','aceita','recusada'], default: 'pendente' },
  reason: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AulaParticular', aulaParticularSchema);
