import { forwardRef, memo } from 'react';
import { Input } from './Input';
import { cn } from '../../utils/cn';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const FormInputBase = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, containerClassName, ...props }, ref) => {
    // 提取外层传入的 className 中与 border/ring 相关的样式，然后用错误样式覆盖
    // 最优方案：直接在这里管理所有的 border 样式，确保错误状态优先级最高
    const finalClassName = cn(
      className,
      // 错误状态的样式必须最后，确保 CSS 级联时优先级最高
      error && [
        'border-red-500',
        'hover:border-red-500',
        'focus:border-red-500',
        'focus-visible:border-red-500',
        'ring-red-500/20',
        'dark:ring-red-500/40'
      ]
    );

    return (
      <div className={cn('flex flex-col', containerClassName)}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <Input
          ref={ref}
          aria-invalid={!!error}
          className={finalClassName}
          {...props}
        />
      </div>
    );
  }
);

FormInputBase.displayName = 'FormInput';

export const FormInput = memo(FormInputBase);
