import type { ApplicationFormData } from "../schema";

/**
 * Extracts relevant form context for AI text generation
 */
export function extractFormContextForAI(
  formData: Partial<ApplicationFormData>
): {
  employmentStatus?: string;
  monthlyIncome?: number;
  dependents?: number;
  maritalStatus?: string;
} {
  return {
    employmentStatus: formData.employmentStatus,
    monthlyIncome: formData.monthlyIncome,
    dependents: formData.dependents,
    maritalStatus: formData.maritalStatus,
  };
}
