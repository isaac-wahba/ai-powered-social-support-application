import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface StepLayoutProps {
  stepKey: string;
  children: React.ReactNode;
}

export function StepLayout({ stepKey, children }: StepLayoutProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t(stepKey)}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 3,
          mt: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
