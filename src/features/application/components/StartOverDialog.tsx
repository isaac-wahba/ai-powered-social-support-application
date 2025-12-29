import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface StartOverDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function StartOverDialog({
  open,
  onClose,
  onConfirm,
}: StartOverDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="start-over-dialog-title"
      aria-describedby="start-over-dialog-description"
    >
      <DialogTitle id="start-over-dialog-title">{t("startOver")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="start-over-dialog-description">
          {t("startOverConfirm")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t("cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          autoFocus
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
