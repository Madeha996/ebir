import React from "react";
import { PagesModal } from "@app/domain/AppModal";
import GenericAddModal from "./Generic/GenericAddModal";
import { Input } from "@app/components/common/inputs/Input/Input";

const AddPagesModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: PagesModal) => void;
}> = ({ visible, onCancel, onCreate }) => {
  return (
    <GenericAddModal<PagesModal>
      visible={visible}
      onCancel={onCancel}
      onCreate={onCreate}
      title="Add New"
      fields={[
        {
          name: "name",
          label: "common.name",
          component: <Input />,
          rules: [{ required: true, message: "common.requiredField" }],
        },
      ]}
    />
  );
};

export default AddPagesModal;
