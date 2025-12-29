import { Box, Alert } from "@mui/material";
import { StepLayout } from "./StepLayout";
import { AIFieldWithButton } from "./components/AIFieldWithButton";
import { useAIFieldHandler } from "../../../hooks/useAIFieldHandler";
import { STEP3_FIELDS } from "./constants/step3Fields";

export function Step3Situation() {
  const { loading, error, handleGenerateAndSet, clearError } =
    useAIFieldHandler();

  return (
    <StepLayout stepKey="step3">
      {error && (
        <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
          <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      {STEP3_FIELDS.map(({ fieldName, labelKey }) => (
        <AIFieldWithButton
          key={fieldName}
          fieldName={fieldName}
          labelKey={labelKey}
          loading={loading === fieldName}
          onGenerate={() => handleGenerateAndSet(fieldName)}
          disabled={loading !== null}
        />
      ))}
    </StepLayout>
  );
}
