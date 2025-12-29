import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

interface RHFNumberFieldProps
  extends Omit<TextFieldProps, "name" | "error" | "helperText" | "type"> {
  name: string;
  helperText?: string;
}

export function RHFNumberField({
  name,
  helperText,
  ...other
}: RHFNumberFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          type="number"
          error={!!error}
          helperText={error?.message || helperText}
          fullWidth
          onChange={(e) => {
            const value = e.target.value;
            // Convert to number if value is not empty, otherwise keep as empty string
            field.onChange(value === "" ? "" : Number(value));
          }}
          value={field.value ?? ""}
        />
      )}
    />
  );
}
