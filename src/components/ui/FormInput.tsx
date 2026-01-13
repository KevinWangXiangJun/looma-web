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
    return (
      <div className={cn('flex flex-col', containerClassName)}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <Input
          ref={ref}
          className={cn(
            className,
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          {...props}
        />
      </div>
    );
  }
);

FormInputBase.displayName = 'FormInput';

export const FormInput = memo(FormInputBase);
