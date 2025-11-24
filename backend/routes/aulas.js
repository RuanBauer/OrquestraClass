const express = require('express');
const Aula = require('../models/Aula');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');

const router = express.Router();

// Create aula (professor)
router.post('/', auth, permit('professor'), async (req, res) => {
  const { title, description, date, duration, turma } = req.body;
  const a = new Aula({ title, description, date, duration, turma, professor: req.userId });
  await a.save();
  res.json(a);
});

// List aulas (for a turma or all)
router.get('/', auth, async (req, res) => {
  const { turma } = req.query;
  const q = turma ? { turma } : {};
  const aulas = await Aula.find(q).populate('turma professor', '-password');
  res.json(aulas);
});

module.exports = router;
