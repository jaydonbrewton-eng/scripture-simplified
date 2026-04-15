import { NextRequest } from "next/server";
import { getCached, setCache } from "@/lib/cache";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ definition: "Please wait a moment before trying again.", original: "", note: "" }, { status: 429 });
  }

  const { word, verseContext, reference } = await request.json();

  const cacheKey = `define:${word.toLowerCase()}:${reference}`;
  const cached = getCached<{ definition: string; original: string; note: string }>(cacheKey);
  if (cached) return Response.json(cached);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({
      definition: `"${word}" — To get AI-powered word definitions, add your OpenAI API key to .env.local.`,
      original: "",
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
            content: `You are a Bible word study assistant. When given a word from a Bible verse, explain what it means in that specific biblical context. Be concise and accessible for young readers.

You MUST respond in this exact JSON format (no markdown, no code fences):
{"definition": "A clear 1-2 sentence definition of the word as used in this verse", "original": "If relevant, the original Hebrew or Greek word and its literal meaning. Otherwise empty string.", "note": "Optional: a brief note on why this word matters or how it changes understanding. Otherwise empty string."}`,
          },
          {
            role: "user",
            content: `Define the word "${word}" as used in this Bible verse from ${reference}:\n\n"${verseContext}"`,
          },
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const result = JSON.parse(content);
      setCache(cacheKey, result);
      return Response.json(result);
    } catch {
      const result = { definition: content, original: "", note: "" };
      setCache(cacheKey, result);
      return Response.json(result);
    }
  } catch {
    return Response.json({
      definition: `Could not define "${word}". Try again later.`,
      original: "",
      note: "",
    });
  }
}
