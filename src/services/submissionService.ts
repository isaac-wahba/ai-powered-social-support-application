import type { ApplicationFormData } from "../features/application/schema";

/**
 * Mock submission service
 * Simulates API call with timeout
 */
export interface SubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

const MOCK_SUBMISSION_DELAY = 2000;

/**
 * Submits the application form data
 * @param formData - The complete form data to submit
 * @returns Promise that resolves with submission result
 */
export async function submitApplication(
  formData: ApplicationFormData
): Promise<SubmissionResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, this would be an actual API call
      console.log("Submitting application:", formData);

      resolve({
        success: true,
        message: "Application submitted successfully",
      });
    }, MOCK_SUBMISSION_DELAY);
  });
}
