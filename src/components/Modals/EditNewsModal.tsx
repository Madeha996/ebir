import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { NewsModal } from "@app/domain/AppModal";

interface EditFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: NewsModal) => void;
  editedValues: NewsModal | undefined;
  title?: string;
}

export const EditNewsModal: React.FC<EditFormModalProps> = ({
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

  const onFinish = (PagesData: NewsModal) => {
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
          <Input value={editedValues?.title} />
        </BaseForm.Item>
      </BaseForm>
    </Modal>
  );
};
