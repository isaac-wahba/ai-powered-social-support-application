/**
 * Application wizard steps enum
 */
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  FINANCIAL_INFO = 1,
  SITUATION = 2,
}

export const TOTAL_STEPS = Object.keys(ApplicationStep).length / 2; // Divide by 2 because enum has both keys and values

