import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CreateDialog } from './CreateDialog';

/**
 * 创建按钮组件
 * 位于侧边栏顶部，点击打开创建对话框
 */
export const CreateButton = (): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 mb-2 flex flex-col items-center justify-center gap-1 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
      >
        <Plus size={20} />
      </button>

      <span className="text-xs font-medium text-primary-600 leading-none text-center max-w-full truncate px-1 mb-2">
        {t('navigation.create') || 'Create'}
      </span>

      <CreateDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default CreateButton;
