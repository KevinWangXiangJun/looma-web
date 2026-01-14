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
    // 当有错误时，应用错误状态样式覆盖基础样式
    const errorStyles = error ? [
      'border-red-500',
      'hover:border-red-600',
      'hover:bg-red-50',
      'focus:border-red-500',
      'focus:ring-red-100',
      'focus-visible:border-red-500',
      'focus-visible:ring-red-100',
    ].join(' ') : '';

    return (
      <div className={cn('flex flex-col', containerClassName)}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <Input
          ref={ref}
          aria-invalid={!!error}
          className={cn(className, errorStyles)}
          {...props}
        />
      </div>
    );
  }
);

FormInputBase.displayName = 'FormInput';

export const FormInput = memo(FormInputBase);
