const Aluno = require("../models/Aluno");

// criar aluno
exports.createAluno = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar aluno" });
  }
};

// listar todos
exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate("turma");
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar alunos" });
  }
};

// pegar aluno por id
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id).populate("turma");
    if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ message: "Erro" });
  }
};

// atualizar
exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar aluno" });
  }
};

// deletar
exports.deleteAluno = async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ message: "Aluno removido" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar aluno" });
  }
};
