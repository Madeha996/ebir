import React from "react";
import { ConfigProvider } from "antd";
import arEg from "antd/lib/locale/ar_EG";
import enUS from "antd/lib/locale/en_US";
import GlobalStyle from "./styles/GlobalStyle";
import "typeface-montserrat";
import "typeface-lato";
import { AppRouter } from "./components/router/AppRouter";
import { useLanguage } from "./hooks/useLanguage";
import { usePWA } from "./hooks/usePWA";
import { useThemeWatcher } from "./hooks/useThemeWatcher";
import { useAppSelector } from "./hooks/reduxHooks";
import { themeObject } from "./styles/themes/themeVariables";
import { QueryClient, QueryClientProvider } from "react-query";

const App: React.FC = () => {
  const { language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";
  const theme = useAppSelector((state) => state.theme.theme);
  const queryClient = new QueryClient();

  usePWA();

  useThemeWatcher();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <meta name="theme-color" content={themeObject[theme].primary} />
        <GlobalStyle />
        <div dir={dir}>
          <ConfigProvider
            locale={language === "en" ? enUS : arEg}
            direction={dir}
          >
            <AppRouter />
          </ConfigProvider>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
