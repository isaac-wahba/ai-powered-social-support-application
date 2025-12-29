import { useFormContext } from "react-hook-form";
import { useAITextGeneration } from "./useAITextGeneration";
import type { ApplicationFormData } from "../features/application/schema";

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

/**
 * Custom hook for handling AI text generation and form field updates
 */
export function useAIFieldHandler() {
  const { watch, setValue, clearErrors } = useFormContext<ApplicationFormData>();
  const { loading, error, generateText, clearError } = useAITextGeneration();
  const formData = watch();

  const handleGenerateAndSet = async (fieldName: FieldType) => {
    const generatedText = await generateText(fieldName, formData);
    if (generatedText) {
      setValue(fieldName, generatedText, {
        shouldValidate: true,
        shouldDirty: true,
      });
      clearErrors(fieldName);
    }
  };

  return {
    loading,
    error,
    handleGenerateAndSet,
    clearError,
  };
}

