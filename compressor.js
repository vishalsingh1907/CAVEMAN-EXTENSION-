/**
 * Smart Caveman Prompt Compressor
 * Follows the rules:
 * - Drop articles (a, an, the)
 * - Drop fillers (just, really, basically, simply)
 * - Drop pleasantries (sure, happy to, of course, etc.)
 * - Short synonyms (extensive -> big, implement a solution for -> fix)
 * - No hedging
 * - Technical terms stay exact
 * - Fragments allowed
 * - Code blocks and quoted errors stay exact
 */

function compressPrompt(text) {
    // 1. Protect code blocks and quoted text
    const placeholders = [];
    let processedText = text.replace(/(```[\s\S]*?```|`[^`]*`|"[^"]*")/g, (match) => {
        placeholders.push(match);
        return `__PLACEHOLDER_${placeholders.length - 1}__`;
    });

    // 2. Remove pleasantries and hedging (case insensitive)
    const pleasantries = [
        /sure,? I'd be happy to help you with that/gi,
        /I'd be happy to/gi,
        /of course/gi,
        /sure/gi,
        /it might be worth considering/gi,
        /I think that/gi,
        /I believe that/gi,
        /please/gi,
        /thank you/gi,
        /thanks/gi
    ];
    pleasantries.forEach(regex => {
        processedText = processedText.replace(regex, '');
    });

    // 3. Short synonyms
    const synonyms = [
        { find: /\bextensive\b/gi, replace: 'big' },
        { find: /\bimplement a solution for\b/gi, replace: 'fix' },
        { find: /\butilize\b/gi, replace: 'use' },
        { find: /\bassistance\b/gi, replace: 'help' },
        { find: /\badditional\b/gi, replace: 'more' },
        { find: /\bcurrently\b/gi, replace: 'now' }
    ];
    synonyms.forEach(item => {
        processedText = processedText.replace(item.find, item.replace);
    });

    // 4. Drop articles and fillers
    const fillers = /\b(a|an|the|just|really|basically|simply|actually|very)\b/gi;
    processedText = processedText.replace(fillers, '');

    // 5. Clean up whitespace and punctuation
    processedText = processedText
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.!?])/g, '$1')
        .trim();

    // 6. Restore placeholders
    placeholders.forEach((val, i) => {
        processedText = processedText.replace(`__PLACEHOLDER_${i}__`, val);
    });

    return processedText;
}

// Export for testing if in Node, otherwise attach to window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = compressPrompt;
} else {
    window.compressPrompt = compressPrompt;
}
