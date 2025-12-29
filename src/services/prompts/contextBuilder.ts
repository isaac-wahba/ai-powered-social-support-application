import { extractFormContextForAI } from "../../features/application/utils/formContext";
import { translateFormValue } from "../../features/application/utils/formValueTranslator";
import type { ApplicationFormData } from "../../features/application/schema";

/**
 * Builds context string from form data in the target language
 */
export function buildFormContext(
  formData: Partial<ApplicationFormData>,
  language: "en" | "ar"
): string {
  const formContext = extractFormContextForAI(formData);
  const isArabic = language === "ar";
  const contextParts: string[] = [];

  // Personal information (name excluded for privacy)
  if (formContext.age !== undefined) {
    if (isArabic) {
      contextParts.push(`العمر: ${formContext.age} سنة`);
    } else {
      contextParts.push(`Age: ${formContext.age} years old`);
    }
  }

  if (formContext.gender) {
    const translatedGender = translateFormValue(
      "gender",
      formContext.gender,
      language
    );
    if (isArabic) {
      contextParts.push(`النوع: ${translatedGender}`);
    } else {
      contextParts.push(`Gender: ${translatedGender}`);
    }
  }

  // Family & Financial information
  if (formContext.maritalStatus) {
    const translatedStatus = translateFormValue(
      "maritalStatus",
      formContext.maritalStatus,
      language
    );
    if (isArabic) {
      contextParts.push(`الحالة الاجتماعية: ${translatedStatus}`);
    } else {
      contextParts.push(`Marital status: ${translatedStatus}`);
    }
  }

  if (formContext.dependents !== undefined) {
    if (isArabic) {
      contextParts.push(`عدد المعالين: ${formContext.dependents}`);
    } else {
      contextParts.push(`Number of dependents: ${formContext.dependents}`);
    }
  }

  if (formContext.employmentStatus) {
    const translatedStatus = translateFormValue(
      "employmentStatus",
      formContext.employmentStatus,
      language
    );
    if (isArabic) {
      contextParts.push(`حالة التوظيف: ${translatedStatus}`);
    } else {
      contextParts.push(`Employment status: ${translatedStatus}`);
    }
  }

  if (formContext.monthlyIncome !== undefined) {
    if (isArabic) {
      contextParts.push(`الدخل الشهري: ${formContext.monthlyIncome} دولار`);
    } else {
      contextParts.push(`Monthly income: $${formContext.monthlyIncome}`);
    }
  }

  if (formContext.housingStatus) {
    const translatedStatus = translateFormValue(
      "housingStatus",
      formContext.housingStatus,
      language
    );
    if (isArabic) {
      contextParts.push(`حالة السكن: ${translatedStatus}`);
    } else {
      contextParts.push(`Housing status: ${translatedStatus}`);
    }
  }

  if (contextParts.length === 0) {
    return "";
  }

  return isArabic
    ? `\n\nالسياق:\n${contextParts.join("\n")}`
    : `\n\nContext:\n${contextParts.join("\n")}`;
}

