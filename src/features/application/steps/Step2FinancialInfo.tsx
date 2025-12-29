import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Step2FinancialInfo() {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t("step2")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t("step2Placeholder")}
      </Typography>
    </Box>
  );
}

