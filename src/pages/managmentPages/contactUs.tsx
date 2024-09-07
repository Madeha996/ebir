import { GetContact } from "@app/api/socialMedia.api";
import { Card } from "@app/components/common/Card/Card";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { notificationController } from "@app/controllers/notificationController";
import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
const formItemLayout = {
  labelCol: { span: 22 },
  wrapperCol: { span: 22 },
};

const ContactUs = () => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  const [Loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("values", values);
  };
  const { data, isLoading, refetch, isRefetching, isFetched, error } = useQuery(
    ["socialmedia"],
    async () => {
      // setLoading(true); // Set loading to true before the API request
      return await GetContact()
        .then((data) => {
          // setLoading(false); // Set loading to false after receiving data
          return data; // Ensure the data is returned for useQuery to process
        })
        .catch((err) => {
          // setLoading(false); // Set loading to false on error
          notificationController.error({
            message: err?.message || err.error?.message,
          });
          throw err; // Ensure the error is thrown to let useQuery handle it
        });
    }
  );

  console.log("data", data);

  useEffect(() => {
    refetch();
  }, [isFetched]);

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
