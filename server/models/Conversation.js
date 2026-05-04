const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  actionType: {
    type: String,
    required: true
  },
  selectedText: {
    type: String,
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
