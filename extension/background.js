// Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('S.I.V.R.A.J Extension Installed');
  
  // Create Context Menu for quick action without opening popup
  chrome.contextMenus.create({
    id: "sivraj-analyze",
    title: "S.I.V.R.A.J Analyze",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sivraj-analyze") {
    // We would inject our CSS/JS to show an inline tooltip here in the future
    console.log("Analyze clicked for:", info.selectionText);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processAI") {
    
    // 1. YOUR FIREBASE PROJECT ID (Already set)
    const FIREBASE_PROJECT_ID = "jarvis-web-os";

    // Grab the Gemini API Key from the user's local storage settings
    chrome.storage.local.get(['geminiApiKey'], (result) => {
      const GEMINI_API_KEY = result.geminiApiKey;

      if (!GEMINI_API_KEY) {
        sendResponse({ success: false, data: "Error: Please set your Gemini API Key in the Extension settings popup." });
        return;
      }

      const { type, text } = request;
      const language = "hebrew"; // Could also be made dynamic from user settings later
      
      let prompt = "";
      if (type === "summarize") prompt = `Please summarize the following text in ${language}. Keep it concise:\n\n${text}`;
      else if (type === "explain") prompt = `Please explain the following text in simple terms in ${language}:\n\n${text}`;
      else if (type === "rewrite") prompt = `Please neatly rewrite and improve the following text in ${language}:\n\n${text}`;
      else prompt = `Process this text:\n\n${text}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      // Make request to Gemini
      fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })
      .then(res => res.json())
      .then(geminiData => {
        if (geminiData.error) throw new Error(geminiData.error.message);
        
        const aiResponseText = geminiData.candidates[0].content.parts[0].text;
        
        // Save directly to Firestore via REST API
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/Conversations`;
        
        const firestorePayload = {
          fields: {
            userId: { stringValue: "user_from_extension" }, 
            selectedText: { stringValue: text },
            actionType: { stringValue: type },
            aiResponse: { stringValue: aiResponseText },
            createdAt: { timestampValue: new Date().toISOString() }
          }
        };

        fetch(firestoreUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(firestorePayload)
        }).catch(err => console.error("Firestore Save Error:", err));

        sendResponse({ success: true, data: aiResponseText });
      })
      .catch(error => {
        console.error("Gemini API Error:", error);
        sendResponse({ success: false, data: "Error connecting to AI: " + error.message });
      });
    });
    
    return true; // Keep the message channel open for the async response
  }
});
