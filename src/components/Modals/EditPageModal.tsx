import React from "react";
import { Input } from "@app/components/common/inputs/Input/Input";
import EditModal from "./Generic/GenericEditModal";
import { PagesModal } from "@app/domain/AppModal";

interface EditPageModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (data: PagesModal) => void;
  editedValues: PagesModal | undefined;
  title?: string;
}

const fields = [
  {
    name: "name",
    label: "common.name",
    component: Input,
    rules: [{ required: true, message: "common.requiredField" }],
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
