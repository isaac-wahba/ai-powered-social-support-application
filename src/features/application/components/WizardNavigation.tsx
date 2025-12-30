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
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleBackToHome}
        variant="text"
        startIcon={<HomeIcon />}
        disabled={isSubmitting}
        sx={{
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
          gap: 2,
        }}
      >
        {isLastStep ? (
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        ) : isRTL ? (
          <>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!canGoNext || isSubmitting}
            >
              {t("next")}
            </Button>
            <Button
              disabled={!canGoBack || isSubmitting}
              onClick={onBack}
              variant="outlined"
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
            >
              {t("back")}
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!canGoNext || isSubmitting}
            >
              {t("next")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
