import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFTextarea } from "../../../../components/RHFTextarea";
import { HelpMeWriteButton } from "./HelpMeWriteButton";

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

interface AIFieldWithButtonProps {
  fieldName: FieldType;
  labelKey: string;
  loading: boolean;
  onGenerate: () => void;
  disabled: boolean;
}

/**
 * Reusable component for rendering a textarea field with AI generation button
 */
export function AIFieldWithButton({
  fieldName,
  labelKey,
  loading,
  onGenerate,
  disabled,
}: AIFieldWithButtonProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
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
          <RHFTextarea
            name={fieldName}
            label={t(labelKey)}
            rows={6}
            required
          />
        </Box>
        <HelpMeWriteButton
          loading={loading}
          onClick={onGenerate}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
}

