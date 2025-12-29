import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import type { SelectProps } from "@mui/material";

interface RHFSelectProps extends Omit<SelectProps, "name" | "error"> {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export function RHFSelect({ name, label, options, ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            {...other}
            labelId={`${name}-label`}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

