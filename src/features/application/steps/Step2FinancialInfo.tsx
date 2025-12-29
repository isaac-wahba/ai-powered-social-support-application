import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFSelect } from "../../../components/RHFSelect";
import { RHFNumberField } from "../../../components/RHFNumberField";
import { StepLayout } from "./StepLayout";

export function Step2FinancialInfo() {
  const { t } = useTranslation();

  const maritalStatusOptions = [
    { value: "single", label: t("maritalStatusSingle") },
    { value: "married", label: t("maritalStatusMarried") },
    { value: "divorced", label: t("maritalStatusDivorced") },
    { value: "widowed", label: t("maritalStatusWidowed") },
  ];

  const employmentStatusOptions = [
    { value: "employed", label: t("employmentStatusEmployed") },
    { value: "unemployed", label: t("employmentStatusUnemployed") },
    { value: "selfEmployed", label: t("employmentStatusSelfEmployed") },
    { value: "student", label: t("employmentStatusStudent") },
    { value: "retired", label: t("employmentStatusRetired") },
  ];

  const housingStatusOptions = [
    { value: "own", label: t("housingStatusOwn") },
    { value: "rent", label: t("housingStatusRent") },
    { value: "family", label: t("housingStatusFamily") },
    { value: "other", label: t("housingStatusOther") },
  ];

  return (
    <StepLayout stepKey="step2">
      <RHFSelect
        name="maritalStatus"
        label={t("fieldMaritalStatus")}
        options={maritalStatusOptions}
        required
      />

      <RHFNumberField
        name="dependents"
        label={t("fieldDependents")}
        inputProps={{ min: 0, step: 1 }}
        required
      />

      <RHFSelect
        name="employmentStatus"
        label={t("fieldEmploymentStatus")}
        options={employmentStatusOptions}
        required
      />

      <RHFNumberField
        name="monthlyIncome"
        label={t("fieldMonthlyIncome")}
        inputProps={{ min: 0, step: 0.01 }}
        required
      />

      <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
        <RHFSelect
          name="housingStatus"
          label={t("fieldHousingStatus")}
          options={housingStatusOptions}
          required
        />
      </Box>
    </StepLayout>
  );
}

