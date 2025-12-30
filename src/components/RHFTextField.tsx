import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

interface RHFTextFieldProps extends Omit<TextFieldProps, "name" | "error" | "helperText"> {
  name: string;
  helperText?: string;
}

export function RHFTextField({ name, helperText, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          error={!!error}
          helperText={error?.message || helperText}
          fullWidth
          aria-invalid={!!error}
          aria-describedby={
            error || helperText
              ? `${name}-${error ? "error" : "helper"}-text`
              : undefined
          }
          slotProps={{
            ...other.slotProps,
            input: {
              ...other.slotProps?.input,
              "aria-required": other.required,
            },
            formHelperText: {
              ...other.slotProps?.formHelperText,
              id: error ? `${name}-error-text` : `${name}-helper-text`,
              role: error ? "alert" : undefined,
            },
          }}
        />
      )}
    />
  );
}

