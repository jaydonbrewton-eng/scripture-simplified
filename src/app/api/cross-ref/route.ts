import { NextRequest } from "next/server";
import { getCached, setCache } from "@/lib/cache";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ connection: "Please wait a moment before trying again." }, { status: 429 });
  }

  const { originalVerse, originalReference, crossReference, crossVerseText } = await request.json();

  const cacheKey = `crossref:${originalReference}:${crossReference}`;
  const cached = getCached<{ connection: string }>(cacheKey);
  if (cached) return Response.json(cached);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ connection: "This verse connects to the one you're studying." });
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
            content: `You explain why two Bible verses are connected. Given an original verse and a cross-reference, write 1-2 sentences explaining how the cross-reference relates to or reinforces the original verse. Be concise, clear, and accessible for a young reader. Don't be preachy. Just explain the connection.

Respond with ONLY the explanation text, no JSON, no quotes, no prefixes.`,
          },
          {
            role: "user",
            content: `Original verse (${originalReference}): "${originalVerse}"\n\nCross-reference (${crossReference}): "${crossVerseText}"\n\nHow does the cross-reference connect to the original verse?`,
          },
        ],
        temperature: 0.6,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const connection = data.choices?.[0]?.message?.content?.trim() || "This verse reinforces the same idea.";
    const result = { connection };
    setCache(cacheKey, result);
    return Response.json(result);
  } catch {
    return Response.json({ connection: "This verse connects to the one you're studying." });
  }
}
