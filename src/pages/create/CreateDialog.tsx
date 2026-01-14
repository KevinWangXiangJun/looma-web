import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { FormInput } from '@/components/ui';

interface CreateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * 创建弹出框组件
 * 参考设计: 搜索框 + 快捷操作 + 内容区域
 */
export const CreateDialog = ({ isOpen, onOpenChange }: CreateDialogProps): JSX.Element => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  // 当对话框打开时，自动聚焦输入框
  useEffect(() => {
    if (isOpen) {
      // 使用 setTimeout 确保 DOM 已更新
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      // 对话框关闭时，重置搜索值
      setSearchValue('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh] p-0 flex flex-col bg-white">
        {/* 顶部搜索栏 */}
        <div className="flex-shrink-0 border-b">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{t('navigation.create')}</DialogTitle>
            </div>

            {/* 搜索输入框 */}
            <div className="relative">
              <FormInput
                ref={inputRef}
                type="text"
                placeholder={t('common.search') || 'Search...'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded text-base bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* 快捷操作区域 */}
        <div className="flex-shrink-0 p-6 pt-2 border-b">
          <div className="bg-gray-100 space-y-4 p-4 rounded-lg">
            <div className="text-sm text-gray-700 mb-3">快捷操作</div>
            <div className="grid grid-cols-4 gap-3">
                {['AI编程', 'AI写作', '翻译', '品牌工具箱', '内容规划表', '实体模型', '调整尺寸'].map(
                (item, idx) => (
                    <button
                    key={idx}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-sm text-gray-700"
                    >
                    {item}
                    </button>
                )
                )}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-6">
          {searchValue ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">搜索结果："{searchValue}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {/* 空状态或模板网格 */}
              <div className="flex items-center justify-center p-8 rounded-lg border-2 border-dashed border-gray-300 text-gray-400">
                <p>选择一个模板开始创建</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
