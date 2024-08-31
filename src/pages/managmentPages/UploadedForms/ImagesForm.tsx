import React, { useState } from "react";
import { Row, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Button } from "@app/components/common/buttons/Button/Button";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import UploadComponent from "@app/pages/managmentPages/UploadedCards/UploadComponent";
import { Spinner } from "@app/components/common/Spinner/Spinner";
import UploadedImageCard from "@app/pages/managmentPages/UploadedCards/UploadedImageCard";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface ImagesFormProps {
  imagesList: any[];
  newImagesList: any[];
  setNewImagesList: any;
  loading: boolean;
  handleUploadImages: (info: any) => void;
  handeSubmissionImages: () => void;
  handleDeleteImageCard: (uid: string) => void;
  onFinish: () => void;
}

export const ImagesForm = ({
  imagesList,
  newImagesList,
  handleUploadImages,
  handleDeleteImageCard,
  handeSubmissionImages,
  onFinish,
  setNewImagesList,
  loading,
}: ImagesFormProps) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleChildData = (
    index: number,
    data: { title?: string; description?: string }
  ) => {
    setNewImagesList((prevList: any) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], ...data };
      return updatedList;
    });
  };

  return (
    <>
      <Spinner spinning={loading}>
        <BaseButtonsForm
          form={form}
          {...formItemLayout}
          isFieldsChanged={isFieldsChanged}
          onFieldsChange={() => setFieldsChanged(true)}
          name="imagesForm"
          initialValues={{}}
          footer={
            <BaseButtonsForm.Item style={{ marginTop: "0.5rem" }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={newImagesList.length === 0}
                loading={loading}
              >
                {t("common.submit")}
              </Button>
            </BaseButtonsForm.Item>
          }
          onFinish={handeSubmissionImages}
        >
          <Row align="middle" justify="space-between">
            <Typography.Title>Images</Typography.Title>
            <UploadComponent
              label="Click to upload Image"
              onChange={handleUploadImages}
              fileList={newImagesList}
            />
          </Row>
          {newImagesList.length > 0 || imagesList.length > 0 ? (
            <Card
              style={{
                background: "var(--shadow-color)",
                border: "none",
              }}
            >
              <Row gutter={[10, 20]}>
                {newImagesList.map((item, index) => (
                  <UploadedImageCard
                    key={item.uid}
                    filePath={item.url}
                    onDelete={handleDeleteImageCard}
                    uid={item.uid}
                    index={index}
                    getChildData={handleChildData}
                  />
                ))}
                {imagesList.map((item) => (
                  <UploadedImageCard
                    key={item._id}
                    title={item.title}
                    filePath={item.filePath}
                    description={item.description}
                    id={item._id}
                  />
                ))}
              </Row>
            </Card>
          ) : (
            <Row justify="center">
              <Typography.Paragraph>
                No Uploaded Images Yet
              </Typography.Paragraph>
            </Row>
          )}
        </BaseButtonsForm>
      </Spinner>
    </>
  );
};
