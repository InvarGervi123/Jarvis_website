chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "getSelection") {
    const selection = window.getSelection().toString().trim();
    sendResponse({ selectedText: selection });
  }
});
