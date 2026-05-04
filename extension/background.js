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
    
    const { type, text } = request;
    
    // Call the local Node.js backend which safely manages the API Key and MongoDB
    fetch('http://localhost:5000/api/ai/process', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, text })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error(data.data || "Unknown server error");
      sendResponse({ success: true, data: data.data });
    })
    .catch(error => {
      console.error("Backend API Error:", error);
      sendResponse({ success: false, data: "Error connecting to Server: " + error.message });
    });
    
    return true; // Keep the message channel open for the async response
  }
});
