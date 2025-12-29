import type { UseFormTrigger } from "react-hook-form";
import { ApplicationStep, TOTAL_STEPS } from "../features/application/constants/steps";
import { STEP_FIELDS } from "../features/application/constants/stepFields";
import type { ApplicationFormData } from "../features/application/schema";

interface UseStepNavigationParams {
  activeStep: ApplicationStep;
  setActiveStep: (step: ApplicationStep) => void;
  trigger: UseFormTrigger<ApplicationFormData>;
}

interface UseStepNavigationReturn {
  handleNext: () => Promise<void>;
  handleBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
}

/**
 * Custom hook for managing step navigation logic
 */
export function useStepNavigation({
  activeStep,
  setActiveStep,
  trigger,
}: UseStepNavigationParams): UseStepNavigationReturn {
  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[activeStep] || [];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const nextStep = (activeStep + 1) as ApplicationStep;
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = (activeStep - 1) as ApplicationStep;
    setActiveStep(prevStep);
  };

  const canGoNext = activeStep < TOTAL_STEPS - 1;
  const canGoBack = activeStep > ApplicationStep.PERSONAL_INFO;

  return {
    handleNext,
    handleBack,
    canGoNext,
    canGoBack,
  };
}

