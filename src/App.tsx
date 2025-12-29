import { useTranslation } from "react-i18next";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ApplicationWizard } from "./features/application/ApplicationWizard";
import "./i18n";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <AppBar
        position="static"
        elevation={2}
        sx={{
          width: "100%",
          backgroundColor: (theme) => theme.palette.primary.main,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            {t("welcome")}
          </Typography>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      <ApplicationWizard />
    </>
  );
}

export default App;
