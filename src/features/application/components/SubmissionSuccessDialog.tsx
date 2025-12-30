import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface SubmissionSuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog component shown after successful form submission
 */
export function SubmissionSuccessDialog({
  open,
  onClose,
}: SubmissionSuccessDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="submission-success-dialog-title"
      aria-describedby="submission-success-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="submission-success-dialog-title">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 32 }} />
          {t("submissionSuccess")}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="submission-success-dialog-description">
          {t("submissionSuccessMessage")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary" autoFocus>
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

