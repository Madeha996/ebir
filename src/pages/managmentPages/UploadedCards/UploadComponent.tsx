import { UploadOutlined } from "@ant-design/icons";
import { Button } from "@app/components/common/buttons/Button/Button.styles";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Upload } from "@app/components/common/Upload/Upload.styles";
import { message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface UploadComponentProps {
  accept?: string;
  onChange: any;
  label: string;
  allowedTypes?: string[];
  fileList?: any;
}

const UploadComponent = ({
  allowedTypes,
  onChange,
  label,
  fileList,
}: UploadComponentProps) => {
  //   const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];

  // const handleBeforeUpload = (file: any) => {
  //   const isAllowedType = allowedTypes.includes(file.type);
  //   if (!isAllowedType) {
  //     message.error(`You can only upload ${allowedTypes.join(", ")} videos.`);
  //   }
  //   return isAllowedType;
  // };

  const { t } = useTranslation();
  return (
    <BaseButtonsForm.Item name="uploadImage">
      <Upload
        multiple
        action={"http://localhost:3000/"}
        listType="picture"
        // accept={accept}
        fileList={fileList}
        // beforeUpload={handleBeforeUpload}
        showUploadList={false}
        // beforeUpload={handleUpload}
        onChange={onChange}
      >
        <Button icon={<UploadOutlined />}>{label}</Button>
      </Upload>
    </BaseButtonsForm.Item>
  );
};

export default UploadComponent;
