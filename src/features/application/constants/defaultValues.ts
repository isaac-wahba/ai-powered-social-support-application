import type { ApplicationFormData } from "../schema";

export const defaultValues: Partial<ApplicationFormData> = {
  name: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
  maritalStatus: "",
  dependents: 0,
  employmentStatus: "",
  monthlyIncome: 0,
  housingStatus: "",
  currentFinancialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
};

