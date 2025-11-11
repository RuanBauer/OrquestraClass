import express from "express";
import Lesson from "../models/Lesson.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar aula
router.post("/", protect, async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Listar aulas do usuário
router.get("/", protect, async (req, res) => {
  const lessons = await Lesson.find({
    $or: [{ student: req.user._id }, { teacher: req.user._id }],
  }).populate("student teacher", "name");
  res.json(lessons);
});

// Cancelar aula
router.put("/:id/cancel", protect, async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: "Aula não encontrada" });

  lesson.status = "cancelada";
  await lesson.save();
  res.json(lesson);
});

export default router;
