import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { PagesModal } from "@app/domain/NotesModal";

interface EditFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: PagesModal) => void;
  editedValues: PagesModal | undefined;
}

export const EditFormModal: React.FC<EditFormModalProps> = ({
  visible,
  onCancel,
  onEdit,
  editedValues,
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

  const onFinish = (PagesData: PagesModal) => {
    onEdit(PagesData);
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
        initialValues={editedValues}
      >
        <BaseForm.Item
          name="name"
          label={t("common.name")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input value={editedValues?.name} />
        </BaseForm.Item>
      </BaseForm>
    </Modal>
  );
};
