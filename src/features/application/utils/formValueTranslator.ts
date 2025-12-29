/**
 * Maps form values to their translated labels for AI context
 */
export function translateFormValue(
  _field: "employmentStatus" | "maritalStatus",
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
  };

  return translations[value]?.[language] || value;
}

