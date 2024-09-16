import React from "react";
import { AdminModal } from "@app/domain/AppModal";
import GenericAddModal from "./Generic/GenericAddModal";
import { Input } from "@app/components/common/inputs/Input/Input";

const AddAdmainModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: AdminModal) => void;
}> = ({ visible, onCancel, onCreate }) => {
  return (
    <GenericAddModal<AdminModal>
      visible={visible}
      onCancel={onCancel}
      onCreate={onCreate}
      title="Add New Admin"
      fields={[
        {
          name: "name",
          label: "common.name",
          component: <Input />,
          rules: [{ required: true, message: "common.requiredField" }],
        },
        {
          name: "email",
          label: "common.email",
          component: <Input />,
          rules: [{ required: true, message: "common.requiredField" }],
        },
        {
          name: "password",
          label: "common.password",
          component: <Input />,
          rules: [{ required: true, message: "common.requiredField" }],
        },
      ]}
    />
  );
};

export default AddAdmainModal;
