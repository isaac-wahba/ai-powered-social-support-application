import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function usePageTitle() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const baseTitle = "Social Support Portal";
    const baseTitleAr = "بوابة الدعم الاجتماعي";
    const isArabic = i18n.language === "ar";

    let pageTitle = "";

    switch (location.pathname) {
      case "/":
        pageTitle = isArabic ? baseTitleAr : baseTitle;
        break;
      case "/application": {
        const formTitle = t("applicationForm");
        pageTitle = isArabic
          ? `${formTitle} - ${baseTitleAr}`
          : `${formTitle} - ${baseTitle}`;
        break;
      }
      default:
        pageTitle = isArabic ? baseTitleAr : baseTitle;
    }

    document.title = pageTitle;
  }, [location.pathname, i18n.language, t]);
}
