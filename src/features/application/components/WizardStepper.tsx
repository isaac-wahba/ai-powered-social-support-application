import { Stepper, Step, StepLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ApplicationStep } from "../constants/steps";

const STEP_LABELS = ["step1", "step2", "step3"];

interface WizardStepperProps {
  activeStep: ApplicationStep;
}

/**
 * Stepper component for the wizard
 */
export function WizardStepper({ activeStep }: WizardStepperProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        mt: { xs: 2, sm: 4 },
        mb: { xs: 2, sm: 4 },
        "& .MuiStepLabel-root": {
          "& .MuiStepLabel-label": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            marginLeft: isRTL ? 0 : "8px",
            marginRight: isRTL ? "8px" : 0,
          },
        },
      }}
    >
      {STEP_LABELS.map((label) => (
        <Step key={label}>
          <StepLabel
            sx={{
              "& .MuiStepLabel-label": {
                display: { xs: "none", sm: "block" },
              },
            }}
          >
            {t(label)}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
