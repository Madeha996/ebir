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
      label: t("common.name"),
      component: Input,
      rules: [{ required: true, message: t("common.requiredField") }], // Use `t` for message
    },
    {
      name: "email",
      label: t("common.email"),
      component: Input,
      rules: [{ required: true, message: t("common.requiredField") }],
    },
    {
      name: "password",
      label: t("common.password"),
      component: Input,
      rules: [{ required: true, message: t("common.requiredField") }],
      value: undefined, // Ensure password is undefined
    },
  ];

  return (
    <EditModal
      visible={visible}
      onCancel={onCancel}
      onEdit={onEdit}
      editedValues={editedValues}
      title={title || t("common.editAdmin")} // Translate title
      fields={fields}
    />
  );
};
