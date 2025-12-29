import type { ApplicationFormData } from "./schema";
import { ApplicationStep } from "./constants/steps";

const STORAGE_KEY = "social-support-form-progress";
const STEP_STORAGE_KEY = "social-support-active-step";

export const storage = {
  save: (data: Partial<ApplicationFormData>): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save form progress:", error);
    }
  },

  load: (): Partial<ApplicationFormData> | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as Partial<ApplicationFormData>;
    } catch (error) {
      console.error("Failed to load form progress:", error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear form progress:", error);
    }
  },

  saveStep: (step: number): void => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify(step));
    } catch (error) {
      console.error("Failed to save active step:", error);
    }
  },

  loadStep: (): number | null => {
    try {
      const stored = localStorage.getItem(STEP_STORAGE_KEY);
      if (!stored) return null;
      const step = JSON.parse(stored) as number;
      // Validate step is within valid range (0-2)
      if (
        step >= ApplicationStep.PERSONAL_INFO &&
        step <= ApplicationStep.SITUATION
      ) {
        return step;
      }
      return null;
    } catch (error) {
      console.error("Failed to load active step:", error);
      return null;
    }
  },
};
