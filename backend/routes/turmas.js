const express = require('express');
const Turma = require('../models/Turma');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');

const router = express.Router();

// Create turma (admin)
router.post('/', auth, permit('admin'), async (req, res) => {
  const { name, naipe } = req.body;
  const t = new Turma({ name, naipe });
  await t.save();
  res.json(t);
});

// List turmas
router.get('/', auth, async (req, res) => {
  const turmas = await Turma.find().populate('professores alunos', '-password');
  res.json(turmas);
});

module.exports = router;
