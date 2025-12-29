import { z } from "zod";

export const applicationFormSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),

  // Step 2: Family & Financial Info
  maritalStatus: z.string().min(1, "Marital Status is required"),
  dependents: z.number().min(0, "Dependents must be 0 or greater"),
  employmentStatus: z.string().min(1, "Employment Status is required"),
  monthlyIncome: z.number().min(0, "Monthly Income must be 0 or greater"),
  housingStatus: z.string().min(1, "Housing Status is required"),

  // Step 3: Situation Description
  currentFinancialSituation: z
    .string()
    .min(1, "Current Financial Situation is required"),
  employmentCircumstances: z
    .string()
    .min(1, "Employment Circumstances is required"),
  reasonForApplying: z.string().min(1, "Reason for Applying is required"),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
