import { Dates } from "@app/constants/Dates";
import { LanguageType } from "@app/interfaces/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = (): {
  language: LanguageType;
  setLanguage: (locale: LanguageType) => Promise<void>;
  direction: "ltr" | "rtl";
} => {
  const { i18n } = useTranslation();
  const [localLanguage, setLocalLanguage] = useState<LanguageType>(
    (localStorage.getItem("simoLng") as LanguageType) || "en"
  );

  const handleChangeLanguage = useCallback(
    async (locale: LanguageType) => {
      Dates.setLocale(locale);
      localStorage.setItem("simoLng", locale);
      await i18n.changeLanguage(locale);
      setLocalLanguage(locale);
    },
    [i18n]
  );

  useEffect(() => {
    i18n.language === "ar"
      ? (document.body.style.fontFamily = "Cairo, sans-serif")
      : (document.body.style.fontFamily = "Lato, sans-serif");

    const direction = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", direction); // Set direction attribute
  }, [i18n.language]);

  useEffect(() => {
    localLanguage && handleChangeLanguage(localLanguage);
  }, [handleChangeLanguage, localLanguage]);

  return useMemo(
    () => ({
      language: i18n.language as LanguageType,
      setLanguage: handleChangeLanguage,
      direction: i18n.language === "ar" ? "rtl" : "ltr",
    }),
    [handleChangeLanguage, i18n.language]
  );
};
