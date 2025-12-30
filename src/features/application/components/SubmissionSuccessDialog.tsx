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
  onFillNewApplication: () => void;
  onGoToHome: () => void;
}

/**
 * Dialog component shown after successful form submission
 */
export function SubmissionSuccessDialog({
  open,
  onFillNewApplication,
  onGoToHome,
}: SubmissionSuccessDialogProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Dialog
      open={open}
      onClose={onGoToHome}
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
      <DialogActions
        sx={{
          flexDirection: isRTL ? "row-reverse" : "row",
          gap: 2,
        }}
      >
        <Button
          onClick={onFillNewApplication}
          variant="contained"
          color="primary"
          autoFocus
        >
          {t("fillNewApplication")}
        </Button>
        <Button onClick={onGoToHome} variant="outlined">
          {t("goToHome")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
