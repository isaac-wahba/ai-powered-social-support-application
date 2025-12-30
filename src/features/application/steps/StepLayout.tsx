import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface StepLayoutProps {
  stepKey: string;
  children: React.ReactNode;
}

export const StepLayout = memo(({ stepKey, children }: StepLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ mt: { xs: 2, sm: 3 } }}
      role="region"
      aria-labelledby={`${stepKey}-heading`}
    >
      <Typography
        id={`${stepKey}-heading`}
        variant="h6"
        component="h2"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      >
        {t(stepKey)}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
          mt: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
