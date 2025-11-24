import User from '../models/User.js';

export const listPendentes = async (req, res) => {
  const pendentes = await User.find({ approved: false }, '-password');
  res.json(pendentes);
};
