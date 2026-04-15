import { NextRequest } from "next/server";
import { getCached, setCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  const { verse, reference, translation } = await request.json();

  const cacheKey = `breakdown:${reference}:${translation}`;
  const cached = getCached<{ breakdown: string; crossReferences: string[] }>(cacheKey);
  if (cached) return Response.json(cached);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({
      breakdown: generateFallbackBreakdown(verse, reference),
      crossReferences: [],
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
            content: `You are a Bible study assistant that makes scripture accessible and digestible for Gen Z readers. Your job is to explain Bible verses in plain, modern language WITHOUT changing, diluting, or taking away from the original message.

Rules:
- Use casual, relatable language that a young person would naturally use
- Keep the spiritual depth and meaning 100% intact
- Break down any old/archaic language into modern equivalents
- Provide brief historical or cultural context when helpful
- Keep explanations concise (3-5 sentences max)
- Never add your own interpretation or theology -- stick to what the text says
- Be respectful and reverent while being approachable
- Don't use slang that might date quickly or feel forced

You MUST respond in this exact JSON format (no markdown, no code fences):
{"breakdown": "Your plain language explanation here", "crossReferences": ["Book Chapter:Verse", "Book Chapter:Verse"]}

Include 2-4 cross-references: other Bible verses that relate to or reinforce the same message.`,
          },
          {
            role: "user",
            content: `Break down this Bible verse in plain language and provide cross-references. The verse is from ${reference} (${translation.toUpperCase()} translation):\n\n"${verse}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(content);
      const result = {
        breakdown: parsed.breakdown || generateFallbackBreakdown(verse, reference),
        crossReferences: parsed.crossReferences || [],
      };
      setCache(cacheKey, result);
      return Response.json(result);
    } catch {
      const result = {
        breakdown: content || generateFallbackBreakdown(verse, reference),
        crossReferences: [],
      };
      setCache(cacheKey, result);
      return Response.json(result);
    }
  } catch {
    return Response.json({
      breakdown: generateFallbackBreakdown(verse, reference),
      crossReferences: [],
    });
  }
}

function generateFallbackBreakdown(verse: string, reference: string): string {
  return `${reference}\n\nThis verse says: "${verse.trim()}"\n\nTo get AI-powered breakdowns in plain language, add your OpenAI API key to .env.local:\n\nOPENAI_API_KEY=your-key-here\n\nThen restart the dev server. The AI will explain each verse in modern, easy-to-understand language while keeping the full message intact.`;
}
