import OpenAI from "openai";
import { fallbackSummarize } from "./falbackSummarize";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

export async function summarizeContent(content: string) {
    try {
        if (!content || content.trim().length === 0) {
            throw new Error("Content is empty");
        }
        // Try using OpenAI first
        if (process.env.OPENAI_API_KEY) {
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

                const summary = comp?.choices?.[0]?.message?.content?.trim() || "";
                
                if (!summary) {
                    throw new Error("OpenAI returned empty response");
                }

                console.log("OpenAI summarization successful");
                return summary;
            } catch (openaiError: any) {
                // Use fallback if OpenAI fails
                const fallbackResult = fallbackSummarize(content);
                return fallbackResult;
            }
        } else {
            // No OpenAI key, use fallback
            const fallbackResult = fallbackSummarize(content);
            return fallbackResult;
        }
    } catch (error: any) {
        const excerpt = content.substring(0, 500).trim();
        if (excerpt.length === 0) {
            throw new Error("Unable to summarize content");
        }
        return excerpt;
    }
}