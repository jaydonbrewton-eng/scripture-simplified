import { NextRequest } from "next/server";
import { getCached, setCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  const { book, chapter, verseSummary } = await request.json();

  const cacheKey = `commentary:${book}:${chapter}`;
  const cached = getCached<{ context: string; keyThemes: string[]; lifeApplication: string }>(cacheKey);
  if (cached) return Response.json(cached);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({
      context: `To get AI-powered commentary for ${book} ${chapter}, add your OpenAI API key to .env.local.`,
      keyThemes: [],
      lifeApplication: "",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Bible commentary assistant for Gen Z readers. Provide historical and cultural context, key themes, and real-life application for Bible chapters. Keep it real, relatable, and respectful. Never change or dilute the message.

You MUST respond in this exact JSON format (no markdown, no code fences):
{
  "context": "2-3 sentences of historical/cultural background. Who wrote this, when, why, and what was happening at the time.",
  "keyThemes": ["Theme 1: brief explanation", "Theme 2: brief explanation", "Theme 3: brief explanation"],
  "lifeApplication": "2-3 sentences on how this chapter applies to real life today, especially for young people."
}`,
          },
          {
            role: "user",
            content: `Provide commentary for ${book} chapter ${chapter}. Here's a summary of the content:\n\n${verseSummary}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const result = JSON.parse(content);
      setCache(cacheKey, result);
      return Response.json(result);
    } catch {
      const result = { context: content, keyThemes: [], lifeApplication: "" };
      setCache(cacheKey, result);
      return Response.json(result);
    }
  } catch {
    return Response.json({
      context: `Could not load commentary for ${book} ${chapter}. Try again later.`,
      keyThemes: [],
      lifeApplication: "",
    });
  }
}
