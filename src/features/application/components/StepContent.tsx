import { ApplicationStep } from "../constants/steps";
import { Step1PersonalInfo } from "../steps/Step1PersonalInfo";
import { Step2FinancialInfo } from "../steps/Step2FinancialInfo";
import { Step3Situation } from "../steps/Step3Situation";

interface StepContentProps {
  step: ApplicationStep;
}

/**
 * Renders the appropriate step component based on the current step
 */
export function StepContent({ step }: StepContentProps) {
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
}
