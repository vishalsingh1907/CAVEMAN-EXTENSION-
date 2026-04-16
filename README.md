# Claude Caveman Prompt Compressor

This Chrome extension automatically shortens your prompts on **Claude.ai** to save tokens while maintaining technical substance. It follows the "Smart Caveman" principle: cutting articles, fillers, and pleasantries while keeping all technical details intact.

## How It Works

The extension monitors the input box on Claude.ai. When you stop typing for a second, it automatically applies the following rules:

- **Core Rule**: Respond like a smart caveman.
- **Grammar**: 
    - Drops articles (`a`, `an`, `the`).
    - Drops fillers (`just`, `really`, `basically`, `simply`).
    - Drops pleasantries (`sure`, `happy to`, `of course`).
    - Uses short synonyms (`extensive` -> `big`, `implement a solution for` -> `fix`).
    - Removes hedging (e.g., "it might be worth considering").
- **Technical Integrity**: 
    - Technical terms (e.g., "polymorphism") remain unchanged.
    - Code blocks (`` `code` ``) and triple-backtick blocks are preserved exactly.
    - Quoted error messages are preserved exactly.
- **Pattern**: Follows `[thing] [action] [reason]. [next step].`

## Setup Instructions

Since this is a custom extension, you need to load it manually into Chrome:

1. **Download the files**: Ensure you have all the extension files in a single folder (e.g., `claude-prompt-shortener`).
2. **Open Chrome Extensions**: Go to `chrome://extensions/` in your browser.
3. **Enable Developer Mode**: Toggle the switch in the top right corner.
4. **Load Unpacked**: Click the "Load unpacked" button in the top left.
5. **Select Folder**: Select the folder containing the extension files.
6. **Use on Claude**: Navigate to [Claude.ai](https://claude.ai). The extension will automatically start working. You can toggle it on/off using the extension popup icon.

## Usage

Just type your prompt as usual. After you stop typing for 1 second, the extension will automatically "caveman-ify" your text.

**Example:**
- *Original*: "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by a bug in the auth middleware where the token expiry check uses `<` instead of `<=`."
- *Caveman*: "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"
