import React from "react";
import { Input } from "@app/components/common/inputs/Input/Input";
import EditModal from "./Generic/GenericEditModal";
import { AdminModal } from "@app/domain/AppModal";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const fields = [
    {
      name: "name",
      label: "common.name",
      component: Input,
      rules: [{ required: true, message: "common.requiredField" }],
    },
    {
      name: "email",
      label: "common.email",
      component: Input,
      rules: [{ required: true, message: "common.requiredField" }],
    },
    {
      name: "password",
      label: t("common.password"),
      component: Input,
      rules: [{ required: true, message: "common.requiredField" }],
      value: undefined,
    },
  ];

  return (
    <EditModal
      visible={visible}
      onCancel={onCancel}
      onEdit={onEdit}
      editedValues={editedValues}
      title={title || "common.editAdmin"}
      fields={fields}
    />
  );
};
