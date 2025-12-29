import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleTitleClick = () => {
    if (!isHomePage) {
      navigate("/");
    }
  };

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
            onClick={handleTitleClick}
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
              cursor: isHomePage ? "default" : "pointer",
              "&:hover": {
                opacity: isHomePage ? 1 : 0.8,
              },
            }}
          >
            {t("welcome")}
          </Typography>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}

