const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use backend-stored dot-env API Key for absolute security
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/process
// Request from Chrome Extension (public endpoint for extension usage)
router.post('/process', async (req, res) => {
  const { type, text } = req.body;
  const language = "hebrew"; // Could read from user settings

  if (!text || !type) {
    return res.status(400).json({ msg: 'Please provide text and action type' });
  }

  let prompt = "";
  if (type === "summarize") prompt = `Please summarize the following text in ${language}. Keep it concise:\n\n${text}`;
  else if (type === "explain") prompt = `Please explain the following text in simple terms in ${language}:\n\n${text}`;
  else if (type === "rewrite") prompt = `Please neatly rewrite and improve the following text in ${language}:\n\n${text}`;
  else prompt = `Process this text in ${language}:\n\n${text}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponseText = response.text();

    // Securely save into MongoDB
    const newConversation = new Conversation({
      userId: req.user ? req.user.id : "extension_user",
      actionType: type,
      selectedText: text,
      aiResponse: aiResponseText
    });

    await newConversation.save();

    res.json({ success: true, data: aiResponseText });
  } catch (err) {
    console.error("Gemini API backend error:", err);
    res.status(500).json({ success: false, data: "Backend AI Processing Error: " + err.message });
  }
});

// GET /api/ai/history
router.get('/history', auth, async (req, res) => {
  try {
    const history = await Conversation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/ai/history/:id
router.delete('/history/:id', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' });
    }

    // Security check
    if (conversation.userId.toString() !== req.user.id) {
       return res.status(401).json({ msg: 'User not authorized to delete this log' });
    }

    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Conversation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
