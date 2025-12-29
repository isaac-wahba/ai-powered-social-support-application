import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "../../../components/RHFTextField";
import { RHFSelect } from "../../../components/RHFSelect";
import { StepLayout } from "./StepLayout";

export function Step1PersonalInfo() {
  const { t } = useTranslation();

  const genderOptions = [
    { value: "male", label: t("genderMale") },
    { value: "female", label: t("genderFemale") },
    { value: "other", label: t("genderOther") },
  ];

  const countryOptions = [
    { value: "us", label: t("countryUs") },
    { value: "uk", label: t("countryUk") },
    { value: "ca", label: t("countryCa") },
    { value: "sa", label: t("countrySa") },
    { value: "ae", label: t("countryAe") },
    { value: "eg", label: t("countryEg") },
    { value: "jo", label: t("countryJo") },
    { value: "lb", label: t("countryLb") },
  ];

  return (
    <StepLayout stepKey="step1">
        <RHFTextField name="name" label={t("fieldName")} required />

        <RHFTextField name="nationalId" label={t("fieldNationalId")} required />

        <RHFTextField
          name="dateOfBirth"
          label={t("fieldDateOfBirth")}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <RHFSelect
          name="gender"
          label={t("fieldGender")}
          options={genderOptions}
          required
        />

        <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
          <RHFTextField name="address" label={t("fieldAddress")} required />
        </Box>

        <RHFTextField name="city" label={t("fieldCity")} required />

        <RHFTextField name="state" label={t("fieldState")} required />

        <RHFSelect
          name="country"
          label={t("fieldCountry")}
          options={countryOptions}
          required
        />

        <RHFTextField
          name="phone"
          label={t("fieldPhone")}
          type="tel"
          required
        />

        <RHFTextField
          name="email"
          label={t("fieldEmail")}
          type="email"
          required
        />
    </StepLayout>
  );
}
