import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Save as SaveIcon,
  SmartToy as SmartToyIcon,
} from "@mui/icons-material";
import { storage } from "../features/application/storage";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hasExistingApplication = storage.hasInProgressApplication();
  const buttonLabel = hasExistingApplication
    ? t("continueApplication")
    : t("startApplication");

  const features = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      title: t("feature1Title"),
      description: t("feature1Description"),
    },
    {
      icon: <SaveIcon sx={{ fontSize: 40 }} />,
      title: t("feature2Title"),
      description: t("feature2Description"),
    },
    {
      icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
      title: t("feature3Title"),
      description: t("feature3Description"),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.primary.main}05 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            mb: 6,
            textAlign: "center",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t("homeTitle")}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, opacity: 0.95 }}>
            {t("homeSubtitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: 600, mx: "auto", opacity: 0.9 }}
          >
            {t("homeDescription")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/application")}
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Paper>

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 4, fontWeight: 600 }}
        >
          {t("featuresTitle")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    color: "primary.main",
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
