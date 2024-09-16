import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { useResetFormOnCloseModal } from "@app/components/forms/ControlForm/useResetFormOnCloseModal";

interface FieldConfig {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  rules?: any[];
}

type FormValues = { [key: string]: any };

interface EditModalProps<T extends FormValues> {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: T) => void;
  editedValues: T | undefined;
  title?: string;
  fields: FieldConfig[];
}

const EditModal = <T extends FormValues>({
  visible,
  onCancel,
  onEdit,
  editedValues,
  title,
  fields,
}: EditModalProps<T>) => {
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  useResetFormOnCloseModal({ form, visible });

  const onOk = () => {
    form.submit();
  };

  const onFinish = (data: T) => {
    onEdit(data);
  };

  return (
    <Modal
      title={t(title || "common.edit")}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <BaseForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="userForm"
        initialValues={{
          ...editedValues,
          password: "", // Ensure password is empty
        }}
      >
        {fields.map(({ name, label, component: Component, rules }) => (
          <BaseForm.Item key={name} name={name} label={t(label)} rules={rules}>
            <Component
              value={name === "password" ? undefined : editedValues?.[name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                form.setFieldsValue({ [name]: e.target.value });
              }}
            />
          </BaseForm.Item>
        ))}
      </BaseForm>
    </Modal>
  );
};

export default EditModal;
