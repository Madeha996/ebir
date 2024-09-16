import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { useResetFormOnCloseModal } from "../../forms/ControlForm/useResetFormOnCloseModal";

interface GenericModalProps<T> {
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: T) => void;
  title: string;
  fields: {
    name: string;
    label: string;
    component: React.ReactNode;
    rules?: any[];
  }[];
}

const GenericAddModal = <T,>({
  visible,
  onCancel,
  onCreate,
  title,
  fields,
}: GenericModalProps<T>) => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  const onFinish = (data: T) => {
    onCreate(data);
  };

  return (
    <Modal title={t(title)} visible={visible} onOk={onOk} onCancel={onCancel}>
      <BaseForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="genericForm"
      >
        {fields.map((field) => (
          <BaseForm.Item
            key={field.name}
            name={field.name}
            label={t(field.label)}
            rules={field.rules}
          >
            {field.component}
          </BaseForm.Item>
        ))}
      </BaseForm>
    </Modal>
  );
};

export default GenericAddModal;
