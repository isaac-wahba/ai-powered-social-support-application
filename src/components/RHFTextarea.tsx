import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

interface RHFTextareaProps
  extends Omit<
    TextFieldProps,
    "name" | "error" | "helperText" | "multiline" | "rows"
  > {
  name: string;
  helperText?: string;
  rows?: number;
}

export function RHFTextarea({
  name,
  helperText,
  rows = 4,
  ...other
}: RHFTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          multiline
          rows={rows}
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
