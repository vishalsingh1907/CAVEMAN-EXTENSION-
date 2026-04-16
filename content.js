let isEnabled = true;

// Load initial state
chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled !== undefined) {
        isEnabled = result.enabled;
    }
});

// Listen for toggle changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        isEnabled = changes.enabled.newValue;
    }
});

/**
 * Claude uses a contenteditable div for its input.
 * We need to monitor changes and apply compression.
 * To avoid infinite loops, we'll use a flag.
 */
let isProcessing = false;

function handleInput(event) {
    if (!isEnabled || isProcessing) return;

    const target = event.target;
    // Claude's input box usually has a specific role or class
    // It's often a div with contenteditable="true"
    if (target.getAttribute('contenteditable') === 'true' || target.tagName === 'TEXTAREA') {
        
        // We use a debounce to wait for the user to stop typing or press space/enter
        clearTimeout(target._cavemanTimeout);
        target._cavemanTimeout = setTimeout(() => {
            const originalText = target.innerText || target.value;
            if (!originalText) return;

            const compressedText = compressPrompt(originalText);

            if (compressedText !== originalText) {
                isProcessing = true;
                
                if (target.getAttribute('contenteditable') === 'true') {
                    target.innerText = compressedText;
                    // Move cursor to end
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(target);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else {
                    target.value = compressedText;
                }

                // Trigger input event so Claude's internal state updates
                target.dispatchEvent(new Event('input', { bubbles: true }));
                
                isProcessing = false;
            }
        }, 1000); // 1 second delay after typing stops
    }
}

// Attach listener to the document to catch dynamically added inputs
document.addEventListener('input', handleInput, true);
