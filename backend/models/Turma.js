const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  naipe: { type: String },
  professores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Turma', turmaSchema);
