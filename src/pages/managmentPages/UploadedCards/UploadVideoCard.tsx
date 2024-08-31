import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import React, { useState } from "react";
import { Card } from "@app/components/common/Card/Card";
import { Button, Col, Image, Input, message, Row } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { useTranslation } from "react-i18next";
import { TextArea } from "@app/components/common/inputs/Input/Input";
import { useMutation } from "react-query";
import {
  DeleteAttachment,
  EditAttachment,
  UploadAttachment,
} from "@app/api/files";
// import ReactPlayer from "react-player";
import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";
import { Modal } from "@app/components/common/Modal/Modal";

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

interface UploadVideoCardProps {
  title?: string;
  filePath: string;
  description?: string;
  id?: string;
  onFinish?: any;
  cardLabel?: string;
  onDelete?: (attachmentId: string) => void; // Add a callback function
  uid?: string;
  type?: string;
  index?: number;
  getChildData?: (
    index: number,
    data: { title?: string; description?: string }
  ) => void;
}
const UploadVideoCard = ({
  title,
  filePath,
  description,
  id,
  cardLabel,
  onFinish,
  onDelete,
  uid,
  type,
  getChildData,
  index,
}: UploadVideoCardProps) => {
  const { t } = useTranslation();
  const url = `https://eabir-backend.onrender.com${filePath}`;
  const [form] = BaseForm.useForm();
  const [isDisable, setIsDisable] = useState<boolean>(!!id);
  const [isFieldsChanged, setIsFieldsChanged] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    form.submit();
  };

  const deleteAttachmentMutation = useMutation((id: string) =>
    DeleteAttachment(id)
  );

  const handleDelete = (id: any, uid: any) => {
    if (id) {
      deleteAttachmentMutation
        .mutateAsync(id)
        .then(() => {
          message.success("Attachment deleted successfully");
        })
        .catch((error) => {
          message.error("Error deleting attachment:", error);
        });
    } else {
      onDelete?.(uid);
    }
  };

  const editAttachmentMutation = useMutation(
    ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description?: string;
    }) => EditAttachment(id, title, description),
    {
      onSuccess: () => {
        setIsFieldsChanged(false);
        setIsDisable(true);
        message.success("Attachment edited successfully");
      },
      onError: (error) => {
        console.error("Error editing attachment:", error);
        message.error("Error editing attachment");
      },
    }
  );

  const handleEditSubmission = () => {
    const { title, description } = form.getFieldsValue();
    if (fileId) {
      editAttachmentMutation.mutateAsync({ id: fileId, title, description });
    }
  };

  const handleEdit = (id: string) => {
    setIsDisable(false);
    setIsFieldsChanged(true);
    setFileId(id);
  };

  const handleFieldChange = () => {
    form
      .validateFields()
      .then((values) => {
        getChildData?.(index!, values);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Spinner spinning={isLoading}>
      <BaseButtonsForm
        isFieldsChanged={isFieldsChanged}
        form={form}
        onFinish={onFinish}
        initialValues={{ title, description }}
        onFieldsChange={handleFieldChange}
        footer={
          fileId ? (
            <Row justify="center" style={{ width: "90%", margin: "auto" }}>
              <Col span={12}>
                <Button
                  type="default"
                  style={{ width: "98%", margin: "0.5rem" }}
                  onClick={() => setIsDisable(true)}
                >
                  {t("common.cancel")}
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  style={{ width: "98%", margin: "0.5rem" }}
                  onClick={handleEditSubmission}
                >
                  {t("common.save")}
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )
        }
      >
        <Card style={{ width: "300px", margin: "auto 1rem" }}>
          <Row
            justify="end"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: 2,
            }}
          >
            {id && (
              <Button
                icon={<CheckOutlined color="green" />}
                style={{
                  margin: "0 0.2rem 0.5rem 0.2rem",
                  border: "1px solid green",
                  borderRadius: "50%",
                  background: "transparent",
                }}
                onClick={() => handleEdit(id ?? "")}
              />
            )}
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              style={{
                margin: "0 0.2rem 0.5rem 0.2rem",
                borderColor: "red",
                border: "1px solid red",
                borderRadius: "50%",
                background: "transparent",
              }}
              onClick={() => setIsDeleteVisible(true)}
            />
          </Row>
          <ReactPlayer
            url={id ? url : filePath}
            controls={true}
            width="100%"
            style={{ aspectRatio: "3/2", objectFit: "contain" }}
          />

          <BaseButtonsForm.Item name="title" initialValue={title}>
            <Input disabled={isDisable} placeholder="Title" />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item name="description" initialValue={description}>
            <TextArea disabled={isDisable} placeholder="Description" />
          </BaseButtonsForm.Item>
        </Card>
        <div>
          <Modal
            title={t("common.DeleteModal")}
            centered
            visible={isDeleteVisible}
            onOk={() => {
              setIsLoading(true);

              if (id) {
                deleteAttachmentMutation
                  .mutateAsync(id)
                  .then(() => {
                    message.success("Attachment deleted successfully");
                  })
                  .catch((error) => {
                    message.error(`Error deleting attachment: ${error}`);
                  })
                  .finally(() => setIsLoading(false));
              } else {
                onDelete?.(uid!);
              }
              setIsDeleteVisible(false);
            }}
            onCancel={() => setIsDeleteVisible(false)}
            size="small"
          >
            <p>{t("modals.deleteEnsureMessage")}</p>
          </Modal>
        </div>
      </BaseButtonsForm>
    </Spinner>
  );
};

export default UploadVideoCard;
