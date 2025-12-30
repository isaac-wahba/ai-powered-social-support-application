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

  hasInProgressApplication: (): boolean => {
    try {
      const savedStep = storage.loadStep();
      // If user has progressed beyond the first step, they have an application in progress
      if (savedStep !== null && savedStep > ApplicationStep.PERSONAL_INFO) {
        return true;
      }

      const savedData = storage.load();
      if (!savedData) return false;

      // Check if saved data is an empty object (happens when "Start Over" is used)
      if (Object.keys(savedData).length === 0) {
        return false;
      }

      // Check if there's any meaningful data (non-empty strings, non-zero numbers)
      const hasData = Object.values(savedData).some((value) => {
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "number") return value !== 0;
        if (typeof value === "object" && value !== null) {
          return Object.keys(value).length > 0;
        }
        return false;
      });

      return hasData;
    } catch (error) {
      console.error("Failed to check in-progress application:", error);
      return false;
    }
  },
};
