import express from "express";
import Content from "../models/Content.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const content = await Content.create({ ...req.body, uploadedBy: req.user._id });
  res.json(content);
});

router.get("/", protect, async (req, res) => {
  const contents = await Content.find().populate("uploadedBy", "name");
  res.json(contents);
});

export default router;
