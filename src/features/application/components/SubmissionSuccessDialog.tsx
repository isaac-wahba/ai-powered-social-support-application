import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
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
      slotProps={{
        paper: {
          sx: {
            m: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: "auto" },
          },
        },
      }}
    >
      <DialogTitle id="submission-success-dialog-title">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
            flexWrap: "wrap",
          }}
        >
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: { xs: 28, sm: 32 } }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {t("submissionSuccess")}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="submission-success-dialog-description">
          {t("submissionSuccessMessage")}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: {
            xs: "column",
            sm: isRTL ? "row-reverse" : "row",
          },
          gap: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
        }}
      >
        <Button
          onClick={onFillNewApplication}
          variant="contained"
          color="primary"
          autoFocus
          sx={{
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "44px", sm: "auto" },
            order: { xs: 1, sm: "unset" },
          }}
        >
          {t("fillNewApplication")}
        </Button>
        <Button
          onClick={onGoToHome}
          variant="outlined"
          sx={{
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "44px", sm: "auto" },
            order: { xs: 2, sm: "unset" },
          }}
        >
          {t("goToHome")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
