import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Step1PersonalInfo } from "./steps/Step1PersonalInfo";
import { Step2FinancialInfo } from "./steps/Step2FinancialInfo";
import { Step3Situation } from "./steps/Step3Situation";
import { applicationFormSchema, type ApplicationFormData } from "./schema";
import { storage } from "./storage";
import { useFormAutoSave } from "../../hooks/useFormAutoSave";
import { ApplicationStep, TOTAL_STEPS } from "./constants/steps";

const steps = ["step1", "step2", "step3"];

const defaultValues: Partial<ApplicationFormData> = {
  name: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
  maritalStatus: "",
  dependents: 0,
  employmentStatus: "",
  monthlyIncome: 0,
  housingStatus: "",
  currentFinancialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
};

export function ApplicationWizard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Load saved step on mount, default to first step if not found
  const savedStep = storage.loadStep();
  const [activeStep, setActiveStep] = useState<ApplicationStep>(
    (savedStep as ApplicationStep) ?? ApplicationStep.PERSONAL_INFO
  );
  const isRTL = i18n.language === "ar";

  // Load saved data on mount
  const savedData = storage.load();
  const initialValues = savedData
    ? { ...defaultValues, ...savedData }
    : defaultValues;

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { watch, reset } = methods;

  // Auto-save with debounce
  useFormAutoSave(watch);

  // Restore saved data on mount
  useEffect(() => {
    if (savedData) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Clear step when navigating away from the application page
  useEffect(() => {
    return () => {
      storage.saveStep(ApplicationStep.PERSONAL_INFO); // Reset to first step when component unmounts
    };
  }, []);

  const handleNext = async () => {
    // Define fields for each step
    const stepFields: Record<ApplicationStep, (keyof ApplicationFormData)[]> = {
      [ApplicationStep.PERSONAL_INFO]: [
        "name",
        "nationalId",
        "dateOfBirth",
        "gender",
        "address",
        "city",
        "state",
        "country",
        "phone",
        "email",
      ],
      [ApplicationStep.FINANCIAL_INFO]: [
        "maritalStatus",
        "dependents",
        "employmentStatus",
        "monthlyIncome",
        "housingStatus",
      ],
      [ApplicationStep.SITUATION]: [
        "currentFinancialSituation",
        "employmentCircumstances",
        "reasonForApplying",
      ],
    };

    // Validate only current step fields
    const fieldsToValidate = stepFields[activeStep] || [];
    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      const nextStep = (activeStep + 1) as ApplicationStep;
      setActiveStep(nextStep);
      storage.saveStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = (activeStep - 1) as ApplicationStep;
    setActiveStep(prevStep);
    storage.saveStep(prevStep);
  };

  const handleBackToHome = () => {
    storage.saveStep(ApplicationStep.PERSONAL_INFO); // Reset to first step
    navigate("/");
  };

  const renderStepContent = (step: ApplicationStep) => {
    switch (step) {
      case ApplicationStep.PERSONAL_INFO:
        return <Step1PersonalInfo />;
      case ApplicationStep.FINANCIAL_INFO:
        return <Step2FinancialInfo />;
      case ApplicationStep.SITUATION:
        return <Step3Situation />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t("welcome")}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      marginLeft: isRTL ? 0 : "8px",
                      marginRight: isRTL ? "8px" : 0,
                    },
                  }}
                >
                  {t(label)}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 200, mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isRTL ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Back to Home button - Material UI automatically handles RTL for startIcon */}
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
            {/* Back/Next buttons - second in DOM for RTL (appears on left), first for LTR (appears on right) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              {/* In RTL: Next first (appears first on left), Back second (appears second on left) */}
              {/* In LTR: Back first (appears first on right), Next second (appears second on right) */}
              {isRTL ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep === TOTAL_STEPS - 1}
                  >
                    {t("next")}
                  </Button>
                  <Button
                    disabled={activeStep === ApplicationStep.PERSONAL_INFO}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    {t("back")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={activeStep === ApplicationStep.PERSONAL_INFO}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    {t("back")}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep === TOTAL_STEPS - 1}
                  >
                    {t("next")}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
