import { Card } from "@app/components/common/Card/Card";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Button, Col, Input, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
const formItemLayout = {
  labelCol: { span: 22 },
  wrapperCol: { span: 22 },
};

const ContactUs = () => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("values", values);
  };

  return (
    <Card>
      <Typography.Title>{t("contact.formTitle")}</Typography.Title>
      <BaseButtonsForm
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        isFieldsChanged={true}
        initialValues={{}}
        layout="vertical"
        name="userForm"
        footer={
          <BaseButtonsForm.Item style={{ marginTop: "0.5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              // loading={isLoading}
            >
              {t("common.submit")}
            </Button>
          </BaseButtonsForm.Item>
        }
      >
        <Row>
          <Col span={12}>
            <BaseButtonsForm.Item
              name="whatsapp"
              label={t("common.whatsapp")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseButtonsForm.Item>
          </Col>
          <Col span={12}>
            <BaseButtonsForm.Item
              name="facebook"
              label={t("common.facebook")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseButtonsForm.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <BaseForm.Item
              name="twitter"
              label={t("common.twitter")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseButtonsForm.Item
              name="tiktok"
              label={t("common.tiktok")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseButtonsForm.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <BaseForm.Item
              name="telegram"
              label={t("common.telegram")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseButtonsForm.Item
              name="snapchat"
              label={t("common.snapchat")}
              rules={[{ required: true, message: t("common.requiredField") }]}
            >
              <Input />
            </BaseButtonsForm.Item>
          </Col>
        </Row>
      </BaseButtonsForm>
    </Card>
  );
};

export default ContactUs;
