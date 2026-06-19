import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

// Inherits all native attributes of a <button> element (onClick, disabled, type...)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {

   const defaultStyles = "flex w-fit items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500";

  return (
    <button
      type={type}
      // cn() merges default styles with any custom className passed as a prop
      className={cn(defaultStyles, className)}
      {...props} // Forwards remaining attributes (disabled, aria-*, id, etc.)
    >
      {children}
    </button>
  );
}
