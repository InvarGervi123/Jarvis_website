const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { GoogleGenAI } = require("@google/genai");

admin.initializeApp();
const db = admin.firestore();

// Read from process.env, which Firebase populates automatically from the .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not set in the .env file.");
}

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

exports.processAI = onRequest({ cors: true }, async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, selectedText, actionType, language = "hebrew" } = req.body.data || req.body;
    
    if (!userId || !selectedText || !actionType) {
      return res.status(400).send({ data: { success: false, error: "Missing required parameters." }});
    }

    // Determine the prompt based on action
    let prompt = "";
    if (actionType === "summarize") {
      prompt = `Please summarize the following text in ${language}. Keep it concise:\n\n${selectedText}`;
    } else if (actionType === "explain") {
      prompt = `Please explain the following text in simple terms in ${language}:\n\n${selectedText}`;
    } else if (actionType === "rewrite") {
      prompt = `Please neatly rewrite and improve the following text in ${language}:\n\n${selectedText}`;
    } else {
      prompt = `Process the following text:\n\n${selectedText}`;
    }

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const aiResponseText = response.text;

    // Save to Firestore History
    const conversationRef = await db.collection("Conversations").add({
      userId: userId,
      selectedText: selectedText,
      actionType: actionType,
      aiResponse: aiResponseText,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Return to the client
    return res.status(200).send({
      data: {
        success: true,
        response: aiResponseText,
        conversationId: conversationRef.id
      }
    });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).send({ data: { success: false, error: error.message }});
  }
});
