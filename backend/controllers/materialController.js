import Material from '../models/Material.js';

export const postMaterial = async (req, res) => {
  try {
    const { title, type, turma } = req.body;
    const file = req.file;
    const finalContent = file ? ('/uploads/' + file.filename) : req.body.content;
    const m = new Material({ title, type, content: finalContent, turma, professor: req.userId });
    await m.save();
    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const listMateriais = async (req, res) => {
  try {
    const { turma } = req.query;
    const q = turma ? { turma } : {};
    const materiais = await Material.find(q).populate('professor','-password');
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
