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
      startIcon={icon}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        mt: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        // Ensure proper spacing between icon and text in RTL
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
