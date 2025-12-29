/**
 * Maps form values to their translated labels for AI context
 */
export function translateFormValue(
  field: "employmentStatus" | "maritalStatus" | "gender" | "housingStatus",
  value: string,
  language: "en" | "ar"
): string {
  const translations: Record<
    string,
    { en: string; ar: string }
  > = {
    // Employment Status
    employed: { en: "Employed", ar: "موظف" },
    unemployed: { en: "Unemployed", ar: "عاطل عن العمل" },
    selfEmployed: { en: "Self-Employed", ar: "يعمل لحسابه الخاص" },
    student: { en: "Student", ar: "طالب" },
    retired: { en: "Retired", ar: "متقاعد" },
    // Marital Status
    single: { en: "Single", ar: "أعزب" },
    married: { en: "Married", ar: "متزوج" },
    divorced: { en: "Divorced", ar: "مطلق" },
    widowed: { en: "Widowed", ar: "أرمل" },
    // Gender
    male: { en: "Male", ar: "ذكر" },
    female: { en: "Female", ar: "أنثى" },
    "gender_other": { en: "Other", ar: "آخر" },
    // Housing Status
    own: { en: "Own", ar: "ملك" },
    rent: { en: "Rent", ar: "إيجار" },
    family: { en: "Living with Family", ar: "يعيش مع العائلة" },
    "housing_other": { en: "Other", ar: "أخرى" },
  };

  // Handle "other" value which exists in both gender and housingStatus
  if (value === "other") {
    if (field === "gender") {
      return translations["gender_other"]?.[language] || value;
    }
    if (field === "housingStatus") {
      return translations["housing_other"]?.[language] || value;
    }
  }

  return translations[value]?.[language] || value;
}

