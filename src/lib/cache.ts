import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const CACHE_DIR = join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "ai-responses.json");

function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function loadCache(): Record<string, { data: unknown; timestamp: number }> {
  try {
    ensureCacheDir();
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch {
    // corrupted cache, start fresh
  }
  return {};
}

function saveCache(cache: Record<string, { data: unknown; timestamp: number }>) {
  try {
    ensureCacheDir();
    writeFileSync(CACHE_FILE, JSON.stringify(cache), "utf-8");
  } catch {
    // write failed, not critical
  }
}

const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function getCached<T>(key: string): T | null {
  const cache = loadCache();
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > MAX_AGE_MS) {
    delete cache[key];
    saveCache(cache);
    return null;
  }
  return entry.data as T;
}

export function setCache(key: string, data: unknown) {
  const cache = loadCache();
  cache[key] = { data, timestamp: Date.now() };
  saveCache(cache);
}
