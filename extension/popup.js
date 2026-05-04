document.addEventListener('DOMContentLoaded', () => {
  const btnSummarize = document.getElementById('btn-summarize');
  const btnExplain = document.getElementById('btn-explain');
  const btnRewrite = document.getElementById('btn-rewrite');
  const responseBox = document.getElementById('response-box');

  function handleAction(actionType) {
    responseBox.textContent = `Processing ${actionType}...`;
    responseBox.style.color = '#00d2ff';

    // Get selected text from active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { command: "getSelection" }, (response) => {
        if (chrome.runtime.lastError || !response || !response.selectedText) {
          responseBox.textContent = "Error: Please select some text on the page first.";
          responseBox.style.color = '#ef4444';
          return;
        }

        const selectedText = response.selectedText;
        
        // Send to background to trigger API call
        chrome.runtime.sendMessage({ 
          action: "processAI", 
          type: actionType, 
          text: selectedText 
        }, (apiResponse) => {
          if (apiResponse && apiResponse.success) {
            responseBox.textContent = apiResponse.data;
            responseBox.style.color = '#ffffff';
          } else {
            responseBox.textContent = "AI Error: " + (apiResponse?.data || "Failed to process request.");
            responseBox.style.color = '#ef4444';
          }
        });
      });
    });
  }

  btnSummarize.addEventListener('click', () => handleAction('summarize'));
  btnExplain.addEventListener('click', () => handleAction('explain'));
  btnRewrite.addEventListener('click', () => handleAction('rewrite'));
});
