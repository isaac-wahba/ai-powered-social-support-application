import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Layout } from "./components/Layout";
import { usePageTitle } from "./hooks/usePageTitle";
import "./i18n";

const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home }))
);
const Application = lazy(() =>
  import("./pages/Application").then((module) => ({
    default: module.Application,
  }))
);

function LoadingFallback() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function AppContent() {
  usePageTitle();

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
