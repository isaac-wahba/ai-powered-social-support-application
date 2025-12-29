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

  const icon = loading ? <CircularProgress size={16} /> : <AutoFixHighIcon />;

  return (
    <Button
      variant="outlined"
      startIcon={!isRTL ? icon : undefined}
      endIcon={isRTL ? icon : undefined}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        mt: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...(isRTL && {
          "& .MuiButton-endIcon": {
            marginLeft: 0,
            marginRight: "8px",
          },
        }),
      }}
    >
      {loading ? t("aiGenerating") : t("helpMeWrite")}
    </Button>
  );
}
