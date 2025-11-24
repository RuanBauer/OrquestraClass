const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','professor','aluno'], default: 'aluno' },
  approved: { type: Boolean, default: false },
  turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
