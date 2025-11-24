const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['material','atividade','video'], default: 'material' },
  content: { type: String }, // url ou texto ou caminho de upload
  turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
