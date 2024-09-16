import React from "react";
import { Input } from "@app/components/common/inputs/Input/Input";
import EditModal from "./Generic/GenericEditModal";
import { PagesModal } from "@app/domain/AppModal";
import { useTranslation } from "react-i18next";

interface EditPageModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: PagesModal) => void;
  editedValues: PagesModal | undefined;
  title?: string;
}
const { t } = useTranslation();

const fields = [
  {
    name: "name",
    label: t("common.name"),
    component: Input,
    rules: [{ required: true, message: t("common.requiredField") }],
  },
];

export const EditPageModal: React.FC<EditPageModalProps> = ({
  visible,
  onCancel,
  onEdit,
  editedValues,
  title,
}) => {
  return (
    <EditModal
      visible={visible}
      onCancel={onCancel}
      onEdit={onEdit}
      editedValues={editedValues}
      title={title || "common.editPage"}
      fields={fields}
    />
  );
};
