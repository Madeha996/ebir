import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { useAppDispatch } from "@app/hooks/reduxHooks";
import { doLogin } from "@app/store/slices/authSlice";
import { notificationController } from "@app/controllers/notificationController";
import * as S from "./LoginForm.styles";
import * as Auth from "@app/components/layouts/AuthLayout/AuthLayout.styles";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    dispatch(doLogin(values))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Auth.FormTitle>{t("common.login")}</Auth.FormTitle>
        <S.LoginDescription>{t("login.loginInfo")}</S.LoginDescription>
        <Auth.FormItem
          name="email"
          label={t("common.email")}
          rules={[
            { required: true, message: t("common.requiredField") },
            {
              type: "email",
              message: t("common.notValidEmail"),
            },
          ]}
        >
          <Auth.FormInput placeholder={t("common.email")} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t("common.password")}
          name="password"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Auth.FormInputPassword placeholder={t("common.password")} />
        </Auth.FormItem>

        <BaseForm.Item noStyle>
          <Auth.SubmitButton
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("common.login")}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
