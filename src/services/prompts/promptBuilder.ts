import { getSystemMessage } from "./systemMessages";
import { getUserPrompt } from "./userPrompts";
import { buildFormContext } from "./contextBuilder";
import type { ApplicationFormData } from "../../features/application/schema";

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

export interface BuildPromptParams {
  fieldType: FieldType;
  formData: Partial<ApplicationFormData>;
  language: "en" | "ar";
}

export interface PromptResult {
  systemMessage: string;
  userPrompt: string;
}

/**
 * Builds complete prompt (system message + user prompt) for OpenAI API
 */
export function buildPrompt(params: BuildPromptParams): PromptResult {
  const { fieldType, formData, language } = params;

  const systemMessage = getSystemMessage(language);
  const context = buildFormContext(formData, language);
  const userPrompt = getUserPrompt(fieldType, language, context);

  return {
    systemMessage,
    userPrompt,
  };
}

