import React, { useState } from "react";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Card, Button, Image, Input, message, Row, Col } from "antd";
import { Modal } from "@app/components/common/Modal/Modal";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { DeleteAttachment, EditAttachment } from "@app/api/files";
import { useTranslation } from "react-i18next";
import { TextArea } from "@app/components/common/inputs/Input/Input";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";
import { CheckOutlined } from "@ant-design/icons";

interface UploadedImageCardProps {
  title?: string;
  filePath: string;
  description?: string;
  id?: string;
  onFinish?: any;
  onDelete?: (attachmentId: string) => void;
  uid?: string;
  index?: number;
  getChildData?: (
    index: number,
    data: { title?: string; description?: string }
  ) => void;
  setDeleting?: any;
}

const UploadedImageCard = ({
  title,
  filePath,
  description,
  id,
  onDelete,
  uid,
  index,
  getChildData,
  setDeleting,
}: UploadedImageCardProps) => {
  const { t } = useTranslation();
  const url = `https://eabir-backend.onrender.com${filePath}`;

  const [form] = BaseButtonsForm.useForm();
  const [isDisable, setIsDisable] = useState<boolean>(!!id);
  const [isFieldsChanged, setIsFieldsChanged] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAttachmentMutation = useMutation(
    (id: string) => DeleteAttachment(id),
    {
      onSuccess: () => {
        onDelete?.(id!);
        message.success("Attachment deleted successfully");
        setDeleting((prev: boolean) => !prev);
        // Trigger the parent's refetch function after successful deletion
      },
      onError: (error: any) => {
        message.error(`Error deleting attachment: ${error}`);
      },
    }
  );

  const editAttachmentMutation = useMutation(
    ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description: string;
    }) => EditAttachment(id, title, description),
    {
      onSuccess: () => {
        setIsFieldsChanged(false);
        setIsDisable(true);
        message.success("Attachment edited successfully");
        setDeleting((prev: boolean) => !prev);
      },
      onError: (error) => {
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
    setIsFieldsChanged(true);
    setFileId(id);
    setIsDisable(false);
  };

  const handleFieldChange = () => {
    form
      .validateFields()
      .then((values) => {
        getChildData?.(index!, values);
      })
      .catch((error) => {
        message.error("Validation failed:", error);
      });
  };

  return (
    <Spinner spinning={isLoading}>
      <BaseButtonsForm
        isFieldsChanged={isFieldsChanged}
        form={form}
        initialValues={{ title, description }}
        onFieldsChange={handleFieldChange}
        footer={
          fileId ? (
            <Row justify="center" style={{ width: "90%", margin: "4px auto" }}>
              <Col span={12}>
                <Button
                  type="default"
                  style={{ width: "98%" }}
                  onClick={() => setIsDisable(true)}
                >
                  {t("common.cancel")}
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  style={{ width: "98%" }}
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
        <Card
          style={{
            width: "300px",
            margin: "auto 1rem",
            position: "relative",
            borderRadius: "10px",
          }}
          bodyStyle={{
            padding: "0",
          }}
        >
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

          <Image
            alt="Image"
            src={id ? url : filePath}
            preview={false}
            style={{
              height: "240px",
              width: "297px",
              borderRadius: "10px 10px 0px 0px",
            }}
          />
          <Row style={{ padding: "0.4rem", width: "100%" }}>
            <BaseButtonsForm.Item name="title" style={{ width: "100%" }}>
              <Input disabled={isDisable} placeholder="Title" />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="description" style={{ width: "100%" }}>
              <TextArea disabled={isDisable} placeholder="Description" />
            </BaseButtonsForm.Item>
          </Row>
        </Card>
        <div>
          <Modal
            title={t("common.deleteModal")}
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

export default UploadedImageCard;
