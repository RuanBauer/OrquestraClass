const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  duration: { type: Number },
  turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Aula', aulaSchema);
