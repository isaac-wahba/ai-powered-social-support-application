import { Button, CircularProgress } from "@mui/material";
import { AutoFixHigh as AutoFixHighIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface HelpMeWriteButtonProps {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function HelpMeWriteButton({
  loading,
  onClick,
  disabled = false,
}: HelpMeWriteButtonProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Button
      variant="outlined"
      startIcon={
        !isRTL ? (
          loading ? (
            <CircularProgress size={16} />
          ) : (
            <AutoFixHighIcon />
          )
        ) : undefined
      }
      endIcon={
        isRTL ? (
          loading ? (
            <CircularProgress size={16} />
          ) : (
            <AutoFixHighIcon />
          )
        ) : undefined
      }
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        mt: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {loading ? t("aiGenerating") : t("helpMeWrite")}
    </Button>
  );
}
