import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils/cn';

export interface ContactTextAreaProps
  extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  error?: string;
  id: string;
}

const ContactTextArea = forwardRef<HTMLTextAreaElement, ContactTextAreaProps>(
  ({ label, error, id, className, rows = 5, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-300"
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'w-full resize-y rounded-lg border bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-500',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-1',
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500'
              : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500',
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="flex items-center gap-1 text-xs text-red-400"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

ContactTextArea.displayName = 'ContactTextArea';

export default ContactTextArea;
