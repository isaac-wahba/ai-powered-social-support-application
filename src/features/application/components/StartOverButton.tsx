import { useState } from "react";
import { Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { UseFormReset, UseFormClearErrors } from "react-hook-form";
import type { ApplicationFormData } from "../schema";
import { defaultValues } from "../constants/defaultValues";
import { ApplicationStep } from "../constants/steps";
import { storage } from "../storage";
import { StartOverDialog } from "./StartOverDialog";

interface StartOverButtonProps {
  onStepReset: () => void;
  resetForm: UseFormReset<ApplicationFormData>;
  clearErrors: UseFormClearErrors<ApplicationFormData>;
}

export function StartOverButton({
  onStepReset,
  resetForm,
  clearErrors,
}: StartOverButtonProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    clearErrors();

    // Clear only form data and step (not other storage data that might exist)
    storage.save({});
    storage.saveStep(ApplicationStep.PERSONAL_INFO);
    resetForm(defaultValues);
    onStepReset();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        startIcon={<RefreshIcon />}
        onClick={handleOpenDialog}
        sx={{
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "text.secondary",
          border: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "action.hover",
            color: "text.primary",
            border: "none",
            boxShadow: "none",
          },
          "&:focus": {
            border: "none",
            boxShadow: "none",
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
          ...(isRTL && {
            "& .MuiButton-startIcon": {
              marginLeft: "8px !important",
            },
          }),
        }}
      >
        {t("startOver")}
      </Button>

      <StartOverDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
      />
    </>
  );
}
