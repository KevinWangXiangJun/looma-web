/**
 * 文件上传相关类型定义
 */

export interface FileUploadProps {
  /** 接受的文件类型，如 'image/*' 或 '.jpg,.png' */
  accept?: string;
  /** 是否支持多文件上传 */
  multiple?: boolean;
  /** 文件选择回调 */
  onFileSelect: (files: File[]) => void;
  /** 自定义标题 */
  title?: string;
  /** 自定义描述 */
  description?: string;
  /** 支持的文件类型提示 */
  supportedFormats?: string;
  /** 最大文件大小（字节）*/
  maxSize?: number;
  /** 自定义样式 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
}
