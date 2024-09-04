import React from "react";
import { Row, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Button } from "@app/components/common/buttons/Button/Button";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import UploadComponent from "@app/pages/managmentPages/UploadedCards/UploadComponent";
import UploadFilesCard from "../UploadedCards/UploadFileCard";
import { Spinner } from "@app/components/common/Spinner/Spinner";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface FilesFormProps {
  filesList: any[];
  newFilesList: any[];
  handeSubmissionFiles: () => void;
  handleUploadFiles: (info: any) => void;
  setNewFilesList: any;
  onFinish: any;
  handleDeleteFileCard: (uid: string) => void;
  loading: boolean;
}

const FilesForm = ({
  handeSubmissionFiles,
  filesList,
  setNewFilesList,
  handleUploadFiles,
  newFilesList,
  onFinish,
  handleDeleteFileCard,
  loading,
}: FilesFormProps) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleChildData = (
    index: number,
    data: { title?: string; description?: string }
  ) => {
    setNewFilesList((prevList: any) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], ...data };
      return updatedList;
    });
  };

  return (
    <Spinner spinning={loading}>
      <BaseButtonsForm
        form={form}
        {...formItemLayout}
        isFieldsChanged={isFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        name="fileForm"
        initialValues={{}}
        footer={
          <BaseButtonsForm.Item style={{ marginTop: "0.5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={newFilesList.length === 0}
            >
              {t("common.submit")}
            </Button>
          </BaseButtonsForm.Item>
        }
        onFinish={handeSubmissionFiles}
      >
        <Row align="middle" justify="space-between">
          <Typography.Title>Files</Typography.Title>
          <UploadComponent
            // allowedTypes={["jpg", "png", "gif"]}
            label="Click to upload Files"
            onChange={handleUploadFiles}
            fileList={newFilesList}
          />
        </Row>

        {newFilesList.length > 0 || filesList.length > 0 ? (
          <Card
            style={{ background: "var(--shadow-color)", marginBottom: "1rem" }}
          >
            <Row gutter={[10, 20]}>
              {newFilesList?.length > 0
                ? newFilesList?.map((item: any, index: number) => {
                    return (
                      <UploadFilesCard
                        filePath={item?.url}
                        onFinish={onFinish}
                        onDelete={handleDeleteFileCard}
                        uid={item?.uid}
                        index={index}
                        getChildData={handleChildData}
                      />
                    );
                  })
                : null}
              {filesList?.length > 0
                ? filesList?.map((item: any) => {
                    return (
                      <UploadFilesCard
                        title={item?.title}
                        filePath={item?.filePath}
                        description={item?.description}
                        id={item?._id}
                      />
                    );
                  })
                : null}
            </Row>
          </Card>
        ) : (
          <Row justify="center">
            <Typography.Paragraph>No Uploaded Files Yet</Typography.Paragraph>
          </Row>
        )}
      </BaseButtonsForm>
    </Spinner>
  );
};

export default FilesForm;
