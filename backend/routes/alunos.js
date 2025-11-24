const express = require('express');
const Aluno = require('../models/Aluno');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');

const router = express.Router();

/*
  GET /api/alunos
  Lista todos os alunos
*/
router.get('/', auth, async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('naipe');
    res.json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
});

/*
  POST /api/alunos
  Cadastrar aluno (somente ADMIN)
*/
router.post('/', auth, permit('admin'), async (req, res) => {
  try {
    const { nome, instrumento, nivel, contato, naipe } = req.body;
    const aluno = new Aluno({ nome, instrumento, nivel, contato, naipe });
    await aluno.save();
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar aluno' });
  }
});

/*
  PUT /api/alunos/:id
  Editar aluno (ADMIN)
*/
router.put('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao editar aluno' });
  }
});

/*
  DELETE /api/alunos/:id
  Remover aluno (ADMIN)
*/
router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ message: 'Aluno removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover aluno' });
  }
});

module.exports = router;
