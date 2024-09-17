import React from "react";
import { NewsModal } from "@app/domain/AppModal";
import GenericAddModal from "./Generic/GenericAddModal";
import { Input } from "@app/components/common/inputs/Input/Input";
import { useTranslation } from "react-i18next";

const AddNewsModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: NewsModal) => void;
}> = ({ visible, onCancel, onCreate }) => {
  const { t } = useTranslation();

  return (
    <GenericAddModal<NewsModal>
      visible={visible}
      onCancel={onCancel}
      onCreate={onCreate}
      title="Add New News"
      fields={[
        {
          name: "title",
          label: "common.title",
          component: <Input />,
          rules: [{ required: true, message: "common.requiredField" }],
        },
      ]}
    />
  );
};

export default AddNewsModal;
