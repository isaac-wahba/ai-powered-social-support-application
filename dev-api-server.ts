// Load environment variables from .env.local FIRST
import dotenv from "dotenv";
import { join } from "path";

// Load .env.local from project root
const envPath = join(process.cwd(), ".env.local");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`❌ Failed to load .env.local: ${result.error.message}`);
  console.error(`   Tried path: ${envPath}`);
  console.error(`   Current working directory: ${process.cwd()}`);
} else {
  console.log(`✅ Loaded .env.local from: ${envPath}`);
}

// Verify the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY not found after loading .env.local!");
  console.error(
    "   Check that .env.local contains: OPENAI_API_KEY=sk-your-key-here"
  );
  console.error("   (No quotes, no spaces around =)");
}

import express from "express";
import cors from "cors";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import handler from "./api/generate-text";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyPrefix: process.env.OPENAI_API_KEY
      ? process.env.OPENAI_API_KEY.substring(0, 7)
      : "missing",
  });
});

app.post("/api/generate-text", async (req, res) => {
  try {
    console.log("📨 Received POST to /api/generate-text");
    // Handler is async - MUST await it
    await handler(
      req as unknown as VercelRequest,
      res as unknown as VercelResponse
    );
  } catch (error) {
    console.error("❌ API handler error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Local API server running on http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/api/health`);

  // Verify API key is loaded
  if (process.env.OPENAI_API_KEY) {
    console.log(
      `✅ OPENAI_API_KEY loaded (${process.env.OPENAI_API_KEY.substring(
        0,
        7
      )}...)`
    );
  } else {
    console.warn(
      `⚠️  WARNING: OPENAI_API_KEY not found in environment variables`
    );
    console.warn(
      `   Make sure .env.local exists in the project root with: OPENAI_API_KEY=sk-...`
    );
  }
});
