import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, Box } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    if (newLanguage !== i18n.language) {
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <LanguageIcon sx={{ color: "white" }} />
      <FormControl
        size="small"
        sx={{
          minWidth: 100,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.7)",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{
            color: "white",
            "& .MuiSelect-select": {
              py: 1,
            },
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  mt: 1,
                },
              },
            },
          }}
        >
          <MenuItem value="en">{t("english")}</MenuItem>
          <MenuItem value="ar">{t("arabic")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
