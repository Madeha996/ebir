import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Input } from "@app/components/common/inputs/Input/Input";
import { InputNumber } from "@app/components/common/inputs/InputNumber/InputNumber";
import { useResetFormOnCloseModal } from "../forms/ControlForm/useResetFormOnCloseModal";
import { Select } from "@app/components/common/selects/Select/Select.styles";
import { NewsModal, PagesModal } from "@app/domain/AppModal";

interface AddFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: NewsModal) => void;
}

export const AddNewsModal: React.FC<AddFormModalProps> = ({
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

  const onFinish = (PagesData: NewsModal) => {
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
          name="title"
          label={t("common.title")}
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Input />
        </BaseForm.Item>
      </BaseForm>
    </Modal>
  );
};
