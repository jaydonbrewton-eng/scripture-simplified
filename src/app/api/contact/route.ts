import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function POST(request: NextRequest) {
  const { name, email, type, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  const redis = getRedis();

  const submission = {
    name,
    email,
    type: type || "general",
    message,
    timestamp: new Date().toISOString(),
  };

  if (redis) {
    // Store in Redis with a unique key
    const key = `contact:${Date.now()}`;
    await redis.set(key, JSON.stringify(submission));
    // Keep for 90 days
    await redis.expire(key, 90 * 24 * 60 * 60);
    // Also push to a list for easy retrieval
    await redis.lpush("contact:all", JSON.stringify(submission));
  }

  // Send email notification via Web3Forms (free, no signup needed for basic use)
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY || "",
        subject: `[Scripture Simplified] ${type === "church" ? "Church Partnership" : type === "bug" ? "Bug Report" : "Contact"}: ${name}`,
        from_name: name,
        reply_to: email,
        message: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`,
      }),
    });
  } catch {
    // Email failed but submission is stored in Redis
  }

  return Response.json({ success: true });
}
