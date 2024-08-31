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
import { useParams } from "react-router-dom";
import PdfImg from "@app/assets/images/login-bg.webp";
import { Link } from "react-router-dom";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";
import { Modal } from "@app/components/common/Modal/Modal";

interface UploadFileCardProps {
  title?: string;
  filePath: string;
  description?: string;
  id?: string;
  onFinish?: any;
  // cardLabel?: string;
  onDelete?: (attachmentId: string) => void; // Add a callback function
  uid?: string;
  type?: string;
  index?: number;
  getChildData?: (
    index: number,
    data: { title?: string; description?: string }
  ) => void;
}
const UploadFilesCard = ({
  title,
  filePath,
  description,
  id,
  // cardLabel,
  onFinish,
  onDelete,
  uid,
  type,
  getChildData,
  index,
}: UploadFileCardProps) => {
  const { t } = useTranslation();

  const url = `https://eabir-backend.onrender.com${filePath}`;
  const [form] = BaseForm.useForm();

  const [isDisable, setIsDisable] = useState<boolean>(!!id);
  const [isFieldsChanged, setIsFieldsChanged] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteAttachmentMutation = useMutation((id: string) =>
    DeleteAttachment(id)
  );
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

  const handleEdit = (id: string) => {
    setIsFieldsChanged(true);
    setFileId(id);
    setIsDisable(false);
  };

  const handleEditSubmission = () => {
    const { title, description } = form.getFieldsValue();
    if (fileId) {
      editAttachmentMutation.mutateAsync({ id: fileId, title, description });
    }
  };

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
    // <Spinner spinning={isLoading}>
    <BaseButtonsForm
      isFieldsChanged={isFieldsChanged}
      form={form}
      initialValues={{ title, description }}
      onFieldsChange={handleFieldChange}
      style={{ width: "98%" }}
      footer={
        fileId ? (
          <Row justify="space-evenly" style={{ width: "90%", margin: "auto" }}>
            <Button
              type="primary"
              style={{ width: "50%", margin: "0.5rem" }}
              onClick={handleEditSubmission}
            >
              {t("common.save")}
            </Button>
            <Button
              type="default"
              style={{ width: "50%", margin: "0.5rem" }}
              onClick={() => setIsDisable(true)}
            >
              {t("common.cancel")}
            </Button>
          </Row>
        ) : (
          <></>
        )
      }
    >
      <Card
        style={{
          width: "100%",
          margin: "auto 1rem",
          display: "flex",
        }}
      >
        <Row align="top" justify="space-between">
          <Col span={4}>
            <Link to={fileId ? url : filePath} target="_blank">
              <Image
                src={PdfImg}
                alt="pdf-img"
                width={150}
                height={150}
                preview={false}
              />
            </Link>
          </Col>

          <Col span={16}>
            <BaseButtonsForm.Item name="title" initialValue={title}>
              <Input placeholder="Title" disabled={isDisable} />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="description" initialValue={description}>
              <TextArea placeholder="Description" disabled={isDisable} />
            </BaseButtonsForm.Item>
          </Col>
          <Col span={2}>
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
          </Col>
        </Row>
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
    // </Spinner>
  );
};

export default UploadFilesCard;
