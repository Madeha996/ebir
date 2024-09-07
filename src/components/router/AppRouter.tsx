import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(
  () => import("@app/components/layouts/AuthLayout/AuthLayout")
);
import LoginPage from "@app/pages/auth/LoginPage";
import SignUpPage from "@app/pages/auth/SignUpPage";
import ForgotPasswordPage from "@app/pages/auth/ForgotPasswordPage";
import SecurityCodePage from "@app/pages/auth/SecurityCodePage";
import NewPasswordPage from "@app/pages/auth/NewPasswordPage";
// import LockPage from '@app/pages/LockPage';

import ProfileLayout from "@app/components/profile/ProfileLayout";
import RequireAuth from "@app/components/router/RequireAuth";
import { withLoading } from "@app/hocs/withLoading.hoc";

// maybe i need it later :
const ServerErrorPage = React.lazy(() => import("@app/pages/ServerErrorPage"));
const Error404Page = React.lazy(() => import("@app/pages/Error404Page"));

const PersonalInfoPage = React.lazy(
  () => import("@app/pages/PersonalInfoPage")
);
const SecuritySettingsPage = React.lazy(
  () => import("@app/pages/SecuritySettingsPage")
);
const NotificationsPage = React.lazy(
  () => import("@app/pages/NotificationsPage")
);
const Logout = React.lazy(() => import("./Logout"));

// Managment
import MainLayout from "@app/components/layouts/main/MainLayout/MainLayout";

const PagesManagmentPage = React.lazy(
  () => import("@app/pages/managmentPages/PagesMangment")
);
const PageSettingPage = React.lazy(
  () => import("@app/pages/managmentPages/PageSetting")
);
const newsPage = React.lazy(() => import("@app/pages/managmentPages/newsPage"));
const contactPage = React.lazy(
  () => import("@app/pages/managmentPages/contactUs")
);

const adminPage = React.lazy(
  () => import("@app/pages/managmentPages/adminManagment")
);

export const NFT_DASHBOARD_PATH = "/";
export const PAGES_MANAGMENT_SETTING = "/pageSetting/:pageId";
export const NEWS_MANAGMENT = "/news-page";
export const CONTACT_US = "/contact-page";
export const ADMIN_MANAGMENT = "/admin-page";

const PagesMangment = withLoading(PagesManagmentPage);
const PageSetting = withLoading(PageSettingPage);
const News = withLoading(newsPage);
const Contact = withLoading(contactPage);
const Admin = withLoading(adminPage);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const Notifications = withLoading(NotificationsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NFT_DASHBOARD_PATH} element={protectedLayout}>
          <Route index element={<PagesMangment />} />
          <Route path={PAGES_MANAGMENT_SETTING} element={<PageSetting />} />
          <Route path={NEWS_MANAGMENT} element={<News />} />
          <Route path={CONTACT_US} element={<Contact />} />
          <Route path={ADMIN_MANAGMENT} element={<Admin />} />
          <Route path="forms"></Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
