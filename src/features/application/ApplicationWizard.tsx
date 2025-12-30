import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { Container, Box, Paper, Typography, Alert } from "@mui/material";
import { storage } from "./storage";
import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useStepNavigation } from "../../hooks/useStepNavigation";
import { useSubmission } from "../../hooks/useSubmission";
import { ApplicationStep } from "./constants/steps";
import { StepContent } from "./components/StepContent";
import { WizardStepper } from "./components/WizardStepper";
import { WizardNavigation } from "./components/WizardNavigation";
import { StartOverButton } from "./components/StartOverButton";
import { SubmissionSuccessDialog } from "./components/SubmissionSuccessDialog";

export function ApplicationWizard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const savedStep = storage.loadStep();
  const [activeStep, setActiveStep] = useState<ApplicationStep>(
    (savedStep as ApplicationStep) ?? ApplicationStep.PERSONAL_INFO
  );

  const methods = useApplicationForm();

  const { handleNext, handleBack, canGoNext, canGoBack } = useStepNavigation({
    activeStep,
    setActiveStep,
    trigger: methods.trigger,
    clearErrors: methods.clearErrors,
  });

  const {
    isSubmitting,
    showSuccessDialog,
    submissionError,
    handleSubmit,
    handleCloseSuccessDialog,
    handleStartNewApplication,
    clearSubmissionError,
  } = useSubmission({
    trigger: methods.trigger,
    getValues: methods.getValues,
    reset: methods.reset,
    clearErrors: methods.clearErrors,
    setActiveStep,
  });

  const handleGoToHome = () => {
    handleCloseSuccessDialog();
    navigate("/");
  };

  useEffect(() => {
    storage.saveStep(activeStep);
  }, [activeStep]);

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
              clearErrors={methods.clearErrors}
            />
          </Box>

          <WizardStepper activeStep={activeStep} />

          <Box sx={{ minHeight: 200, mb: 4 }}>
            {submissionError && (
              <Alert
                severity="error"
                onClose={clearSubmissionError}
                sx={{ mb: 2 }}
              >
                {submissionError}
              </Alert>
            )}
            <StepContent step={activeStep} />
          </Box>

          <WizardNavigation
            activeStep={activeStep}
            canGoNext={canGoNext}
            canGoBack={canGoBack}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </Paper>
      </Container>

      <SubmissionSuccessDialog
        open={showSuccessDialog}
        onFillNewApplication={handleStartNewApplication}
        onGoToHome={handleGoToHome}
      />
    </FormProvider>
  );
}
