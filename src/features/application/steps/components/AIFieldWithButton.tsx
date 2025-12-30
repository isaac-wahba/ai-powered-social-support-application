import { memo } from "react";
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
export const AIFieldWithButton = memo(
  ({
    fieldName,
    labelKey,
    loading,
    onGenerate,
    disabled,
  }: AIFieldWithButtonProps) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    return (
      <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: isRTL ? "row-reverse" : "row",
            },
            gap: { xs: 1.5, sm: 2 },
            alignItems: { xs: "stretch", sm: "flex-start" },
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <RHFTextarea
              name={fieldName}
              label={t(labelKey)}
              rows={6}
              required
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              justifyContent: { xs: "flex-start", sm: "center" },
            }}
          >
            <HelpMeWriteButton
              loading={loading}
              onClick={onGenerate}
              disabled={disabled}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);
