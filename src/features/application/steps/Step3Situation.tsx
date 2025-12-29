import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Step3Situation() {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t("step3")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t("step3Placeholder")}
      </Typography>
    </Box>
  );
}
