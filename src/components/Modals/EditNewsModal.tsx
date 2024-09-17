import React from "react";
import { Input } from "@app/components/common/inputs/Input/Input";
import EditModal from "./Generic/GenericEditModal";
import { NewsModal } from "@app/domain/AppModal";
import { useTranslation } from "react-i18next";

interface EditNewsModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: NewsModal) => void;
  editedValues: NewsModal | undefined;
  title?: string;
}

const fields = [
  {
    name: "title",
    label: "common.name",
    component: Input,
    rules: [{ required: true, message: "common.requiredField" }],
  },
];

export const EditNewsModal: React.FC<EditNewsModalProps> = ({
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
