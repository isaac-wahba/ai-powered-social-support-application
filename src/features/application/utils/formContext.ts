import type { ApplicationFormData } from "../schema";

/**
 * Calculates age from date of birth string (YYYY-MM-DD format)
 */
function calculateAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) return null;
  
  try {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 0 ? age : null;
  } catch {
    return null;
  }
}

/**
 * Extracts relevant form context for AI text generation
 * Note: Name is excluded for privacy reasons
 */
export function extractFormContextForAI(
  formData: Partial<ApplicationFormData>
): {
  age?: number;
  gender?: string;
  maritalStatus?: string;
  dependents?: number;
  employmentStatus?: string;
  monthlyIncome?: number;
  housingStatus?: string;
} {
  const age = formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : undefined;

  return {
    age: age ?? undefined,
    gender: formData.gender,
    maritalStatus: formData.maritalStatus,
    dependents: formData.dependents,
    employmentStatus: formData.employmentStatus,
    monthlyIncome: formData.monthlyIncome,
    housingStatus: formData.housingStatus,
  };
}
