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
      slotProps={{
        paper: {
          sx: {
            m: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: "auto" },
          },
        },
      }}
    >
      <DialogTitle id="start-over-dialog-title">{t("startOver")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="start-over-dialog-description">
          {t("startOverConfirm")}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
        }}
      >
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "44px", sm: "auto" },
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          autoFocus
          sx={{
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "44px", sm: "auto" },
          }}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
