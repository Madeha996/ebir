import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { AdminModal } from "@app/domain/AppModal";

interface EditAdminModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: AdminModal) => void;
  editedValues: AdminModal | undefined;
  title?: string;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = ({
  visible,
  onCancel,
  onEdit,
  editedValues,
  title,
}) => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  const onFinish = (PagesData: AdminModal) => {
    onEdit(PagesData);
  };
  return (
    <Modal
      title={t("common.editPage")}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <BaseForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="userForm"
        initialValues={editedValues}
      >
        <BaseForm.Item
          name="title"
          label={t("common.name")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input value={editedValues?.name} />
        </BaseForm.Item>
        <BaseForm.Item
          name="email"
          label={t("common.email")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input value={editedValues?.email} />
        </BaseForm.Item>
        <BaseForm.Item
          name="password"
          label={t("common.password")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input value={editedValues?.password} />
        </BaseForm.Item>
      </BaseForm>
    </Modal>
  );
};
