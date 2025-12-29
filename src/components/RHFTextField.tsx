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
        />
      )}
    />
  );
}

