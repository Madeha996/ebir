import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { AdminModal } from "@app/domain/AppModal";

interface AddAdminModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: AdminModal) => void;
}

export const AddAdminModal: React.FC<AddAdminModalProps> = ({
  visible,
  onCancel,
  onCreate,
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
    onCreate(PagesData);
  };

  return (
    <Modal
      title={t("Add New")}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <BaseForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="userForm"
      >
        <BaseForm.Item
          name="name"
          label={t("common.name")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input />
        </BaseForm.Item>
        <BaseForm.Item
          name="email"
          label={t("common.email")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input />
        </BaseForm.Item>
        <BaseForm.Item
          name="password"
          label={t("common.password")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input />
        </BaseForm.Item>
      </BaseForm>
    </Modal>
  );
};
