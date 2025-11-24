const express = require('express');
const AulaParticular = require('../models/AulaParticular');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');

const router = express.Router();

// Aluno solicita aula particular
router.post('/solicitar', auth, permit('aluno'), async (req, res) => {
  try {
    const { professor, date, reason } = req.body;
    const a = new AulaParticular({ aluno: req.userId, professor, date, reason, status: 'pendente' });
    await a.save();
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Professor lista solicitações recebidas
router.get('/recebidas', auth, permit('professor'), async (req, res) => {
  try {
    const list = await AulaParticular.find({ professor: req.userId }).populate('aluno','-password');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Professor aceita/recusa
router.post('/responder/:id', auth, permit('professor'), async (req, res) => {
  try {
    const { status } = req.body; // 'aceita' or 'recusada'
    const a = await AulaParticular.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Aluno lista suas solicitações
router.get('/minhas', auth, permit('aluno'), async (req, res) => {
  try {
    const list = await AulaParticular.find({ aluno: req.userId }).populate('professor','-password');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
