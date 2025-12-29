import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Step1PersonalInfo } from "./steps/Step1PersonalInfo";
import { Step2FinancialInfo } from "./steps/Step2FinancialInfo";
import { Step3Situation } from "./steps/Step3Situation";

const steps = ["step1", "step2", "step3"];

export function ApplicationWizard() {
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const isRTL = i18n.language === "ar";

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Step1PersonalInfo />;
      case 1:
        return <Step2FinancialInfo />;
      case 2:
        return <Step3Situation />;
      default:
        return null;
    }
  };

  return (
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

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            {t("back")}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {t("next")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
