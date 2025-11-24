const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  instrumento: { type: String, required: true },
  nivel: { type: String, required: true },
  contato: { type: String },
  turma: { type: mongoose.Schema.Types.ObjectId, ref: "Turma" }
});

module.exports = mongoose.model("Aluno", AlunoSchema);
