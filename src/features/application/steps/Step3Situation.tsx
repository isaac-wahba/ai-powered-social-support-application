import { Box, Button } from "@mui/material";
import { AutoFixHigh as AutoFixHighIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { RHFTextarea } from "../../../components/RHFTextarea";
import { StepLayout } from "./StepLayout";

export function Step3Situation() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleHelpMeWrite = (fieldName: string) => {
    // Placeholder for AI integration (Step 8)
    console.log(`Help Me Write clicked for: ${fieldName}`);
  };

  return (
    <StepLayout stepKey="step3">
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
              name="currentFinancialSituation"
              label={t("fieldCurrentFinancialSituation")}
              rows={6}
              required
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={!isRTL ? <AutoFixHighIcon /> : undefined}
            endIcon={isRTL ? <AutoFixHighIcon /> : undefined}
            onClick={() => handleHelpMeWrite("currentFinancialSituation")}
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t("helpMeWrite")}
          </Button>
        </Box>
      </Box>

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
              name="employmentCircumstances"
              label={t("fieldEmploymentCircumstances")}
              rows={6}
              required
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={!isRTL ? <AutoFixHighIcon /> : undefined}
            endIcon={isRTL ? <AutoFixHighIcon /> : undefined}
            onClick={() => handleHelpMeWrite("employmentCircumstances")}
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t("helpMeWrite")}
          </Button>
        </Box>
      </Box>

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
              name="reasonForApplying"
              label={t("fieldReasonForApplying")}
              rows={6}
              required
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={!isRTL ? <AutoFixHighIcon /> : undefined}
            endIcon={isRTL ? <AutoFixHighIcon /> : undefined}
            onClick={() => handleHelpMeWrite("reasonForApplying")}
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t("helpMeWrite")}
          </Button>
        </Box>
      </Box>
    </StepLayout>
  );
}
