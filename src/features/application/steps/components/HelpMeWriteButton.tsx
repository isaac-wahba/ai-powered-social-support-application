import { Button, CircularProgress } from "@mui/material";
import { AutoFixHigh as AutoFixHighIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface HelpMeWriteButtonProps {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Button component for triggering AI text generation
 * Automatically handles RTL layout for icon positioning
 */
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
        loading ? (
          <CircularProgress size={16} aria-hidden="true" />
        ) : (
          <AutoFixHighIcon aria-hidden="true" />
        )
      }
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? t("aiGenerating") : t("helpMeWrite")}
      aria-busy={loading}
      sx={{
        mt: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: "2px",
        },
        ...(isRTL && {
          "& .MuiButton-startIcon": {
            marginLeft: "8px !important",
          },
        }),
      }}
    >
      {loading ? t("aiGenerating") : t("helpMeWrite")}
    </Button>
  );
}
