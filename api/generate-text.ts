import type { VercelRequest, VercelResponse } from "@vercel/node";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const TIMEOUT_MS = 15_000; // 15 seconds - better UX for "Help me write" feature

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

interface GenerateTextRequest {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limit store
// Note: In-memory rate limiting for demo; production would use shared store (Vercel KV/Upstash).
// This resets on cold starts and is not shared across serverless function instances.
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Gets client identifier from request (IP address)
 * Handles Vercel headers which may be string or string[]
 */
function getClientIdentifier(req: VercelRequest): string {
  // Try to get IP from x-forwarded-for (Vercel provides this)
  const xf = req.headers["x-forwarded-for"];
  const forwarded = Array.isArray(xf) ? xf[0] : xf;
  const ip =
    typeof forwarded === "string" ? forwarded.split(",")[0].trim() : undefined;

  if (ip) return ip;

  // Fallback to x-real-ip
  const realIp = req.headers["x-real-ip"];
  const realIpValue = Array.isArray(realIp) ? realIp[0] : realIp;
  if (typeof realIpValue === "string") {
    return realIpValue;
  }

  // Last resort: try socket remote address (may not work in serverless)
  if (req.socket?.remoteAddress) {
    return req.socket.remoteAddress;
  }

  return "unknown";
}

/**
 * Checks if request is within rate limit
 * Returns { allowed: boolean, remaining: number, resetAt?: number }
 */
function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetAt?: number;
} {
  const now = Date.now();

  // Clean up old entries periodically to prevent memory leaks
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }

  const record = rateLimitStore.get(identifier);

  // No record or window expired - create new record
  if (!record || now > record.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt,
    };
  }

  // Check if limit exceeded
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  // Increment count
  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - record.count,
    resetAt: record.resetAt,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  // CORS not needed since frontend and API are on same Vercel project
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get API key from environment variable
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY on server" });
  }

  // Parse and validate request body
  const body = (req.body ?? {}) as Partial<GenerateTextRequest>;
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "Invalid request body: messages required" });
  }

  // Input validation and guardrails
  // Limit message count
  if (messages.length > 10) {
    return res.status(400).json({ error: "Too many messages (max 10)" });
  }

  // Validate each message structure
  const maxMessageLength = 4000;
  const validRoles = ["system", "user", "assistant"] as const;

  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return res
        .status(400)
        .json({ error: "Invalid message: must be an object" });
    }

    if (typeof msg.content !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid message: content must be a string" });
    }

    if (!validRoles.includes(msg.role)) {
      return res.status(400).json({
        error: `Invalid message role: must be one of ${validRoles.join(", ")}`,
      });
    }

    if (msg.content.length > maxMessageLength) {
      return res.status(400).json({
        error: `Message too long (max ${maxMessageLength} characters)`,
      });
    }
  }

  // Server-controlled model (ignore client's model choice)
  const model = "gpt-3.5-turbo";

  // Clamp max_tokens: between 50 and 500
  const maxTokens = Math.min(Math.max(body.max_tokens ?? 250, 50), 500);

  // Clamp temperature: between 0 and 1
  const temperature = Math.min(Math.max(body.temperature ?? 0.7, 0), 1);

  // Check rate limit
  const clientId = getClientIdentifier(req);
  const rateLimit = checkRateLimit(clientId);

  if (!rateLimit.allowed) {
    // Compute accurate retry seconds
    const now = Date.now();
    const retrySeconds = rateLimit.resetAt
      ? Math.ceil((rateLimit.resetAt - now) / 1000)
      : 60;

    res.setHeader("Retry-After", retrySeconds.toString());
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => ({}))) as OpenAIResponse;

      if (response.status === 401) {
        return res.status(401).json({
          error: "Invalid OpenAI API key",
        });
      }

      if (response.status === 429) {
        return res.status(429).json({
          error: "OpenAI rate limit exceeded. Please try again later.",
        });
      }

      return res.status(response.status).json({
        error: errorData.error?.message || "OpenAI request failed",
      });
    }

    const data = (await response.json()) as OpenAIResponse;
    const generatedText = data?.choices?.[0]?.message?.content?.trim() || "";

    if (!generatedText) {
      return res.status(500).json({ error: "No text was generated" });
    }

    return res.status(200).json({ text: generatedText });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return res.status(isTimeout ? 408 : 500).json({
      error: isTimeout ? "Request timed out" : "Server error",
    });
  } finally {
    clearTimeout(timeout);
  }
}
