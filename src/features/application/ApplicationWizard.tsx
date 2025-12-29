import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import { storage } from "./storage";
import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useStepNavigation } from "../../hooks/useStepNavigation";
import { ApplicationStep } from "./constants/steps";
import { StepContent } from "./components/StepContent";
import { WizardStepper } from "./components/WizardStepper";
import { WizardNavigation } from "./components/WizardNavigation";
import { StartOverButton } from "./components/StartOverButton";

export function ApplicationWizard() {
  const { t } = useTranslation();

  // Load saved step on mount, default to first step if not found
  const savedStep = storage.loadStep();
  const [activeStep, setActiveStep] = useState<ApplicationStep>(
    (savedStep as ApplicationStep) ?? ApplicationStep.PERSONAL_INFO
  );

  // Initialize form with persistence
  const methods = useApplicationForm();

  // Step navigation logic
  const { handleNext, handleBack, canGoNext, canGoBack } = useStepNavigation({
    activeStep,
    setActiveStep,
    trigger: methods.trigger,
  });

  // Save step to localStorage when it changes
  useEffect(() => {
    storage.saveStep(activeStep);
  }, [activeStep]);

  // Clear step when navigating away from the application page
  useEffect(() => {
    return () => {
      storage.saveStep(ApplicationStep.PERSONAL_INFO);
    };
  }, []);

  const handleStepReset = () => {
    setActiveStep(ApplicationStep.PERSONAL_INFO);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              {t("welcome")}
            </Typography>
            <StartOverButton
              onStepReset={handleStepReset}
              resetForm={methods.reset}
            />
          </Box>

          <WizardStepper activeStep={activeStep} />

          <Box sx={{ minHeight: 200, mb: 4 }}>
            <StepContent step={activeStep} />
          </Box>

          <WizardNavigation
            canGoNext={canGoNext}
            canGoBack={canGoBack}
            onNext={handleNext}
            onBack={handleBack}
          />
        </Paper>
      </Container>
    </FormProvider>
  );
}
