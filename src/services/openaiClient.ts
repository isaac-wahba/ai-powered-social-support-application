import type { ApplicationFormData } from "../features/application/schema";
import { buildPrompt } from "./prompts/promptBuilder";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_TIMEOUT = 30000; // 30 seconds

export interface OpenAIError {
  message: string;
  type: "timeout" | "network" | "api_key" | "rate_limit" | "unknown";
}

export interface GenerateTextParams {
  fieldType:
    | "currentFinancialSituation"
    | "employmentCircumstances"
    | "reasonForApplying";
  formData: Partial<ApplicationFormData>;
  language: "en" | "ar";
}

export async function generateTextWithAI(
  params: GenerateTextParams
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw {
      message: "OpenAI API key is not configured",
      type: "api_key" as const,
    } as OpenAIError;
  }

  const { systemMessage, userPrompt } = buildPrompt({
    fieldType: params.fieldType,
    formData: params.formData,
    language: params.language,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw {
          message: "Invalid OpenAI API key",
          type: "api_key" as const,
        } as OpenAIError;
      }

      if (response.status === 429) {
        throw {
          message: "Rate limit exceeded. Please try again later.",
          type: "rate_limit" as const,
        } as OpenAIError;
      }

      throw {
        message: errorData.error?.message || "Failed to generate text",
        type: "unknown" as const,
      } as OpenAIError;
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content?.trim() || "";

    if (!generatedText) {
      throw {
        message: "No text was generated",
        type: "unknown" as const,
      } as OpenAIError;
    }

    return generatedText;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw {
          message: "Request timed out. Please try again.",
          type: "timeout" as const,
        } as OpenAIError;
      }

      if (error.message.includes("fetch")) {
        throw {
          message: "Network error. Please check your connection.",
          type: "network" as const,
        } as OpenAIError;
      }
    }

    // Re-throw if it's already an OpenAIError
    if (error && typeof error === "object" && "type" in error) {
      throw error;
    }

    throw {
      message: "An unexpected error occurred",
      type: "unknown" as const,
    } as OpenAIError;
  }
}
