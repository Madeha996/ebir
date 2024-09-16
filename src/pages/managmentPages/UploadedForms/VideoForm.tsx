import { Row, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Button } from "@app/components/common/buttons/Button/Button";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import UploadComponent from "@app/pages/managmentPages/UploadedCards/UploadComponent";
import UploadVideoCard from "../UploadedCards/UploadVideoCard";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface VideoFormProps {
  videosList: any;
  newVideosList: any;
  setNewVideosList: any;
  loading?: boolean;
  handleUploadVideos: any;
  handeSubmissionVideos: any;
  handleDeleteVideoCard: any;
  onFinish: any;
}

const VideoForm = ({
  handeSubmissionVideos,
  handleUploadVideos,
  setNewVideosList,
  newVideosList,
  onFinish,
  handleDeleteVideoCard,
  videosList,
  loading,
}: VideoFormProps) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleChildData = (
    index: number,
    data: { title?: string; description?: string }
  ) => {
    setNewVideosList((prevList: any) => {
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
        name="videosForm"
        initialValues={{}}
        footer={
          <BaseButtonsForm.Item style={{ marginTop: "0.5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={newVideosList.length === 0}
            >
              {t("common.submit")}
            </Button>
          </BaseButtonsForm.Item>
        }
        onFinish={handeSubmissionVideos}
      >
        <Row align="middle" justify="space-between">
          <Typography.Title>{t("common.videos")}</Typography.Title>
          <UploadComponent
            // allowedTypes={["jpg", "png", "gif"]}
            label={t("uploads.clickToUpload")}
            onChange={handleUploadVideos}
            fileList={newVideosList}
          />
        </Row>
        {newVideosList.length > 0 || videosList.length > 0 ? (
          <Card style={{ background: "var(--shadow-color)" }}>
            <Row gutter={[10, 20]}>
              {newVideosList?.length > 0
                ? newVideosList?.map((item: any, index: number) => {
                    return (
                      <UploadVideoCard
                        filePath={item?.url}
                        onFinish={onFinish}
                        onDelete={handleDeleteVideoCard}
                        uid={item?.uid}
                        index={index}
                        getChildData={handleChildData}
                      />
                    );
                  })
                : null}
              {videosList?.length > 0
                ? videosList?.map((item: any) => {
                    return (
                      <UploadVideoCard
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
            <Typography.Paragraph>
              {t("uploads.noUploadedVideosMessage")}
            </Typography.Paragraph>
          </Row>
        )}
      </BaseButtonsForm>
    </Spinner>
  );
};

export default VideoForm;
