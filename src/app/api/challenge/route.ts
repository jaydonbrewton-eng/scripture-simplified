import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { getChallengeWeekKey } from "@/lib/challenge";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// GET: fetch community count for this week's challenge
export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ count: 0 });
  }

  const key = getChallengeWeekKey();
  const count = await redis.get<number>(key) || 0;
  return Response.json({ count });
}

// POST: increment community count when a user reads a chapter
export async function POST(request: NextRequest) {
  const redis = getRedis();
  if (!redis) {
    return Response.json({ count: 0 });
  }

  const key = getChallengeWeekKey();

  // Increment and set expiry to 8 days (auto-cleanup after the week)
  const count = await redis.incr(key);
  await redis.expire(key, 8 * 24 * 60 * 60);

  return Response.json({ count });
}
