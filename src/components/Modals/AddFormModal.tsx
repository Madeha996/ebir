import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { InputNumber } from "@app/components/common/inputs/InputNumber/InputNumber";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { Select } from "@app/components/common/selects/Select/Select.styles";
import { PagesModal } from "@app/domain/NotesModal";

interface AddFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: PagesModal) => void;
}

export const AddFormModal: React.FC<AddFormModalProps> = ({
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

  const onFinish = (PagesData: PagesModal) => {
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
      </BaseForm>
    </Modal>
  );
};
