import type { ApplicationFormData } from "./schema";

const STORAGE_KEY = "social-support-form-progress";

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
    } catch (error) {
      console.error("Failed to clear form progress:", error);
    }
  },
};
