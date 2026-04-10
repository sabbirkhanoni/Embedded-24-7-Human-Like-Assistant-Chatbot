import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

export async function summarizeContent(content: string) {
    try {
        const comp = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.1,
            max_tokens: 900,
            messages: [
                {
                    role: "system",
                    content: `
                    You are a data summarization engine for an AI Chatbot.
                    Your task is to extract and summarize the most relevant information from the provided content.

                    STRICT RULES:
                    Output only plain text.
                    No markdown, no bullet points, no numbering, no emojis, no special characters, no code blocks, no HTML.
                    Write in paragraph form within 1500 words.
                    `
                },
                {
                    role: "user",
                    content
                }
            ]
        });

        return comp?.choices?.[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("AI Summarization Error:", error);
        throw new Error("Failed to summarize content");
    }
}