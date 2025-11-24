// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // deve bater com o seedAdmin

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email ou senha incorretos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Email ou senha incorretos' });

    // Retorna apenas o necessário para o frontend
    res.json({
      tipo: user.role,       // admin / professor / aluno
      autorizado: user.approved
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};
