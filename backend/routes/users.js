const express = require('express');
const User = require('../models/User');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');

const router = express.Router();

// Listar pendentes (admin)
router.get('/pendentes', auth, permit('admin'), async (req, res) => {
  const pendentes = await User.find({ approved: false }, '-password');
  res.json(pendentes);
});

// Aprovar usuario (admin)
router.post('/aprovar/:id', auth, permit('admin'), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(user);
});

// List all users (admin)
router.get('/', auth, permit('admin'), async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

module.exports = router;
