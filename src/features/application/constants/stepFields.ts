import { ApplicationStep } from "./steps";
import type { ApplicationFormData } from "../schema";

/**
 * Maps each step to its required form fields for validation
 */
export const STEP_FIELDS: Record<
  ApplicationStep,
  (keyof ApplicationFormData)[]
> = {
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
