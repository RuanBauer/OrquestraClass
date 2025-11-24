const express = require('express');
const Material = require('../models/Material');
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/role');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// professor posta material (com arquivo opcional)
router.post('/', auth, permit('professor'), upload.single('file'), async (req, res) => {
  try {
    const { title, type, content, turma } = req.body;
    const file = req.file;
    const finalContent = file ? ('/uploads/' + file.filename) : content;
    const m = new Material({ title, type, content: finalContent, turma, professor: req.userId });
    await m.save();
    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// listar materiais por turma
router.get('/', auth, async (req, res) => {
  const { turma } = req.query;
  const q = turma ? { turma } : {};
  const materiais = await Material.find(q).populate('professor','-password');
  res.json(materiais);
});

module.exports = router;
