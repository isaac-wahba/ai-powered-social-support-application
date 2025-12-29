import { Box, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { RHFTextarea } from "../../../components/RHFTextarea";
import { StepLayout } from "./StepLayout";
import { HelpMeWriteButton } from "./components/HelpMeWriteButton";
import { useAITextGeneration } from "../../../hooks/useAITextGeneration";
import type { ApplicationFormData } from "../../application/schema";

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

export function Step3Situation() {
  const { t, i18n } = useTranslation();
  const { watch, setValue, clearErrors } =
    useFormContext<ApplicationFormData>();
  const isRTL = i18n.language === "ar";
  const { loading, error, generateText, clearError } = useAITextGeneration();

  const formData = watch();

  const handleHelpMeWrite = async (fieldName: FieldType) => {
    const generatedText = await generateText(fieldName, formData);
    if (generatedText) {
      setValue(fieldName, generatedText, {
        shouldValidate: true,
        shouldDirty: true,
      });
      // Explicitly clear any existing errors for this field
      clearErrors(fieldName);
    }
  };

  const renderFieldWithButton = (fieldName: FieldType, labelKey: string) => (
    <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isRTL ? "row-reverse" : "row",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <RHFTextarea name={fieldName} label={t(labelKey)} rows={6} required />
        </Box>
        <HelpMeWriteButton
          loading={loading === fieldName}
          onClick={() => handleHelpMeWrite(fieldName)}
          disabled={loading !== null}
        />
      </Box>
    </Box>
  );

  return (
    <StepLayout stepKey="step3">
      {error && (
        <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
          <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      {renderFieldWithButton(
        "currentFinancialSituation",
        "fieldCurrentFinancialSituation"
      )}
      {renderFieldWithButton(
        "employmentCircumstances",
        "fieldEmploymentCircumstances"
      )}
      {renderFieldWithButton("reasonForApplying", "fieldReasonForApplying")}
    </StepLayout>
  );
}
