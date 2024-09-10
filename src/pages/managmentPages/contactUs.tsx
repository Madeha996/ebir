import { GetContact, UpdateContact } from "@app/api/socialMedia.api";
import { Card } from "@app/components/common/Card/Card";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import { notificationController } from "@app/controllers/notificationController";
import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  WhatsAppOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  TeamOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const formItemLayout = {
  labelCol: { span: 22 },
  wrapperCol: { span: 22 },
};

const ContactUs = () => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const [isFormInitialized, setIsFormInitialized] = useState(false); // New state

  const { data, isLoading, refetch, isFetched, error } = useQuery(
    ["socialmedia"],
    async () => {
      return await GetContact()
        .then((data) => data)
        .catch((err) => {
          notificationController.error({
            message: err?.message || err.error?.message,
          });
          throw err;
        });
    }
  );

  useEffect(() => {
    if (data?.data?.data && !isFormInitialized) {
      const initialValues = data.data.data.reduce((acc: any, item: any) => {
        console.log("Processing item", item);

        // Check and map the `type` to form field names and `link` to values
        if (item.type && item.link) {
          acc[item.type] = item.link;
        } else {
          console.error("Invalid item structure", item);
        }

        console.log("Current accumulator", acc);
        return acc;
      }, {});

      console.log("Initial form values", initialValues);
      form.setFieldsValue(initialValues);
      setIsFormInitialized(true);
    }
  }, [data, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    try {
      const updatePromises = data?.data.data.map(async (item: any) => {
        const updatedData = {
          ...item,
          link: values[item.type], // Get the new link value from the form based on type
        };
        return await UpdateContact(updatedData);
      });

      await Promise.all(updatePromises);

      notificationController.success({
        message: t("common.updateSuccess"),
      });
      refetch(); // Refetch the data after successful update
    } catch (error) {
      notificationController.error({
        message: t("common.updateError"),
      });
    }
  };

  return (
    <>
      <PageTitle>{t("common.contact-page")}</PageTitle>
      <Card>
        <Typography.Title>{t("common.contactInfo")}</Typography.Title>
        <BaseButtonsForm
          isFieldsChanged
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
          layout="vertical"
          name="userForm"
          footer={
            <BaseButtonsForm.Item style={{ marginTop: "0.5rem" }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {t("common.submit")}
              </Button>
            </BaseButtonsForm.Item>
          }
        >
          <Row>
            <Col span={12}>
              <BaseButtonsForm.Item
                name="Whatsapp"
                label={
                  <span>
                    <WhatsAppOutlined /> {t("common.whatsapp")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseButtonsForm.Item>
            </Col>
            <Col span={12}>
              <BaseButtonsForm.Item
                name="Facebook"
                label={
                  <span>
                    <FacebookOutlined /> {t("common.facebook")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BaseForm.Item
                name="Twitter"
                label={
                  <span>
                    <TwitterOutlined /> {t("common.twitter")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseForm.Item>
            </Col>
            <Col span={12}>
              <BaseButtonsForm.Item
                name="Instagram"
                label={
                  <span>
                    <InstagramOutlined /> {t("common.instagram")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BaseForm.Item
                name="Telegram"
                label={
                  <span>
                    <TeamOutlined /> {t("common.telegram")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseForm.Item>
            </Col>
            <Col span={12}>
              <BaseButtonsForm.Item
                name="LinkedIn"
                label={
                  <span>
                    <LinkedinOutlined /> {t("common.linkedIn")}
                  </span>
                }
                rules={[{ required: true, message: t("common.requiredField") }]}
              >
                <Input />
              </BaseButtonsForm.Item>
            </Col>
          </Row>
        </BaseButtonsForm>
      </Card>
    </>
  );
};

export default ContactUs;
