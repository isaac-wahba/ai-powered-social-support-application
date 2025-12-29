import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import { createAppTheme } from "./theme";
import "../i18n";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { i18n } = useTranslation();

  const theme = useMemo(() => {
    const direction = i18n.language === "ar" ? "rtl" : "ltr";
    return createAppTheme(direction);
  }, [i18n.language]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
