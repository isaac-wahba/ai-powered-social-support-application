import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Step1PersonalInfo() {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t("step1")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t("step1Placeholder")}
      </Typography>
    </Box>
  );
}

