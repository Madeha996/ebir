import { ModalProps as AntdModalProps } from 'antd';

export interface ModalProps {
  visible: boolean;
  isLoading?: boolean;
  onCancel: () => void;
}

export interface ActionModalProps extends AntdModalProps {
  visibles: boolean;
  onCancel?: () => void;
  onOK?: (id: any) => void;
  title?: string;
  okText?: string;
  cancelText?: string;
  description?: string;
  okButtonType?: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed' | undefined;
  isDanger?: boolean;
  isLoading?: boolean;
  element?: React.ReactNode;
  isHiddenOkButton?: boolean;
  isHiddenCancelButton?: boolean;
  ModalSize?: 'small' | 'medium' | 'large';
  onHideFooter?: boolean;
}
