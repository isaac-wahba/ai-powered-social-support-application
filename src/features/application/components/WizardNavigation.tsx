import { Box, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface WizardNavigationProps {
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Navigation buttons component for the wizard
 */
export function WizardNavigation({
  canGoNext,
  canGoBack,
  onNext,
  onBack,
}: WizardNavigationProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Back to Home button */}
      <Button
        onClick={handleBackToHome}
        variant="text"
        startIcon={<HomeIcon />}
        sx={{
          // Ensure proper spacing between icon and text in RTL
          ...(isRTL && {
            "& .MuiButton-startIcon": {
              marginLeft: "8px !important",
            },
          }),
        }}
      >
        {t("backToHome")}
      </Button>

      {/* Back/Next buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {isRTL ? (
          <>
            <Button variant="contained" onClick={onNext} disabled={!canGoNext}>
              {t("next")}
            </Button>
            <Button disabled={!canGoBack} onClick={onBack} variant="outlined">
              {t("back")}
            </Button>
          </>
        ) : (
          <>
            <Button disabled={!canGoBack} onClick={onBack} variant="outlined">
              {t("back")}
            </Button>
            <Button variant="contained" onClick={onNext} disabled={!canGoNext}>
              {t("next")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
