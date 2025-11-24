import Aula from '../models/Aula.js';

export const createAula = async (req, res) => {
  try {
    const { title, description, date, duration, turma } = req.body;
    const a = new Aula({ title, description, date, duration, turma, professor: req.userId });
    await a.save();
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const listAulas = async (req, res) => {
  try {
    const { turma } = req.query;
    const q = turma ? { turma } : {};
    const aulas = await Aula.find(q).populate('turma professor', '-password');
    res.json(aulas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
