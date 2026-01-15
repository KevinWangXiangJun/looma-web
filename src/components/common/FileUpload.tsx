/**
 * 文件上传和拖拽组件
 * 支持点击上传和拖拽上传功能
 */
import React, { useRef, useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { FileUploadProps } from '@/types/files';

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*',
  multiple = false,
  onFileSelect,
  title,
  description,
  supportedFormats,
  maxSize,
  className = '',
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 验证文件
   */
  const validateFiles = useCallback((files: File[]): File[] => {
    const validFiles: File[] = [];
    let hasError = false;

    files.forEach((file) => {
      // 检查文件大小
      if (maxSize && file.size > maxSize) {
        setError(
          `文件 "${file.name}" 过大。最大允许 ${(maxSize / 1024 / 1024).toFixed(2)}MB`
        );
        hasError = true;
        return;
      }

      // 检查文件类型
      if (accept !== '*') {
        const acceptArray = accept.split(',').map((a) => a.trim());
        const isAccepted = acceptArray.some((type) => {
          if (type.startsWith('.')) {
            return file.name.endsWith(type);
          } else if (type.includes('/')) {
            // 处理 MIME 类型通配符，如 'image/*'
            const [mainType] = type.split('/');
            return file.type.startsWith(mainType);
          }
          return file.type === type;
        });

        if (!isAccepted) {
          setError(`文件 "${file.name}" 类型不支持`);
          hasError = true;
          return;
        }
      }

      validFiles.push(file);
    });

    if (!hasError && validFiles.length > 0) {
      setError(null);
    }

    return validFiles;
  }, [accept, maxSize]);

  /**
   * 处理文件选择
   */
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles = validateFiles(fileArray);

      if (validFiles.length > 0) {
        onFileSelect(validFiles);
      }
    },
    [validateFiles, onFileSelect]
  );

  /**
   * 处理文件输入变化
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  /**
   * 处理拖拽进入
   */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  /**
   * 处理拖拽离开
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * 处理拖拽悬停
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * 处理拖拽放下
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    handleFileSelect(e.dataTransfer.files);
  };

  /**
   * 处理点击
   */
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      {/* 上传区域 */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-primary-500 bg-primary-50 shadow-lg'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {/* 右上角的格式和大小提示 */}
        {(supportedFormats || maxSize) && (
          <div className="flex justify-end w-full mb-4">
            <div className="border border-dashed border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-xs text-gray-600 flex items-center gap-4">
              {supportedFormats && (
                <span>
                  <span className="font-sm">支持格式:</span> {supportedFormats.replace('支持 ', '').replace(' 等格式', '')}
                </span>
              )}
              {maxSize && (
                <span>
                  <span className="font-sm">最大文件:</span> {(maxSize / 1024 / 1024).toFixed(2)}MB
                </span>
              )}
            </div>
          </div>
        )}

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        {/* 上传图标 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-200 hover:bg-primary-300 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title || '拖拽或点击上传文件'}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-gray-600 mb-1">
          {description || '将文件拖拽到此处，或点击此区域选择文件'}
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
