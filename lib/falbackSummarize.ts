// Fallback summarization using keyword extraction
export function fallbackSummarize(content: string): string {
    let text = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (text.length === 0) return "No content to summarize.";

    // Split into sentences
    const sentences = text
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10);

    if (sentences.length === 0) return text.substring(0, 500);

    // Calculate sentence scores based on keyword frequency
    const words = text.toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 3 && !isStopWord(w));

    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sentenceScores: { [key: number]: number } = {};
    sentences.forEach((sentence, idx) => {
        let score = 0;
        sentence.toLowerCase().split(/\s+/).forEach(word => {
            score += wordFreq[word] || 0;
        });
        sentenceScores[idx] = score;
    });

    // Get top sentences 
    const topCount = Math.max(3, Math.ceil(sentences.length * 0.3));
    const topSentences = Object.entries(sentenceScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topCount)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(entry => sentences[parseInt(entry[0])]);

    return topSentences.join('. ') + '.';
}

// Common English stop words
function isStopWord(word: string): boolean {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
        'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
        'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these',
        'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which',
        'who', 'when', 'where', 'why', 'how', 'as', 'if', 'so', 'than', 'then'
    ]);
    return stopWords.has(word);
}