import { Box, Button, CircularProgress } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ApplicationStep } from "../constants/steps";

interface WizardNavigationProps {
  activeStep: ApplicationStep;
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

/**
 * Navigation buttons component for the wizard
 */
export function WizardNavigation({
  activeStep,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  onSubmit,
  isSubmitting = false,
}: WizardNavigationProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const isLastStep = activeStep === ApplicationStep.SITUATION;

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: isRTL ? "row-reverse" : "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Button
        onClick={handleBackToHome}
        variant="text"
        startIcon={<HomeIcon />}
        disabled={isSubmitting}
        aria-label={t("backToHome")}
        sx={{
          width: { xs: isLastStep ? "auto" : "100%", sm: "auto" },
          minHeight: { xs: "44px", sm: "auto" },
          ...(isRTL && {
            "& .MuiButton-startIcon": {
              marginLeft: "8px !important",
            },
          }),
        }}
      >
        {t("backToHome")}
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { xs: 1.5, sm: 2 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {isLastStep ? (
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={isSubmitting}
            aria-label={isSubmitting ? t("submitting") : t("submitApplication")}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" aria-hidden="true" />
              ) : undefined
            }
            sx={{
              width: { xs: "100%", sm: "auto" },
              minHeight: { xs: "44px", sm: "auto" },
            }}
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        ) : isRTL ? (
          <>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!canGoNext || isSubmitting}
              aria-label={t("nextStep")}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minHeight: { xs: "44px", sm: "auto" },
              }}
            >
              {t("next")}
            </Button>
            <Button
              disabled={!canGoBack || isSubmitting}
              onClick={onBack}
              variant="outlined"
              aria-label={t("previousStep")}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minHeight: { xs: "44px", sm: "auto" },
              }}
            >
              {t("back")}
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={!canGoBack || isSubmitting}
              onClick={onBack}
              variant="outlined"
              aria-label={t("previousStep")}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minHeight: { xs: "44px", sm: "auto" },
              }}
            >
              {t("back")}
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!canGoNext || isSubmitting}
              aria-label={t("nextStep")}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minHeight: { xs: "44px", sm: "auto" },
              }}
            >
              {t("next")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
