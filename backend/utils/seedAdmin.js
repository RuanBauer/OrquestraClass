const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = async function seedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pass = process.env.ADMIN_PASSWORD;
    if (!email || !pass) return;
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin já existe:', email);
      return;
    }
    const hashed = await bcrypt.hash(pass, 10);
    const admin = new User({ name: 'Administrador', email, password: hashed, role: 'admin', approved: true });
    await admin.save();
    console.log('Admin criado:', email);
  } catch (err) {
    console.error('Erro ao criar admin:', err);
  }
};
