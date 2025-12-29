import { useTranslation } from "react-i18next";
import { Container, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import "./i18n";

function App() {
  const { t, i18n } = useTranslation();

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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("welcome")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("language")}: {t(i18n.language === "en" ? "english" : "arabic")}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;
