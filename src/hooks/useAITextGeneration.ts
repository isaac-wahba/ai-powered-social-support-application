import { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateTextWithAI, type OpenAIError } from "../services/openaiClient";
import type { ApplicationFormData } from "../features/application/schema";

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

interface UseAITextGenerationReturn {
  loading: FieldType | null;
  error: string | null;
  generateText: (
    fieldType: FieldType,
    formData: Partial<ApplicationFormData>
  ) => Promise<string | null>;
  clearError: () => void;
}

export function useAITextGeneration(): UseAITextGenerationReturn {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState<FieldType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateText = async (
    fieldType: FieldType,
    formData: Partial<ApplicationFormData>
  ): Promise<string | null> => {
    setError(null);
    setLoading(fieldType);

    try {
      const generatedText = await generateTextWithAI({
        fieldType,
        formData,
        language: i18n.language as "en" | "ar",
      });

      return generatedText;
    } catch (err) {
      const openAIError = err as OpenAIError;
      setError(
        openAIError.message ||
          "An error occurred while generating text. Please try again."
      );
      return null;
    } finally {
      setLoading(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    generateText,
    clearError,
  };
}
