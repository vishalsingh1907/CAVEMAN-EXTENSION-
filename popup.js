const toggleBtn = document.getElementById('toggleBtn');
const statusText = document.getElementById('statusText');

function updateUI(enabled) {
    statusText.innerText = enabled ? 'On' : 'Off';
    statusText.className = 'status ' + (enabled ? 'on' : 'off');
}

chrome.storage.local.get(['enabled'], (result) => {
    let enabled = result.enabled !== false; // Default to true
    updateUI(enabled);
});

toggleBtn.addEventListener('click', () => {
    chrome.storage.local.get(['enabled'], (result) => {
        let enabled = result.enabled !== false;
        let newState = !enabled;
        chrome.storage.local.set({ enabled: newState }, () => {
            updateUI(newState);
        });
    });
});
