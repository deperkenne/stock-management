import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

// Inherits all native attributes of an <a> tag (href, target, onClick...)
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export default function Link({
  children,
  className,
  href,
  ...props
}: LinkProps) {

  // Default styles for the link
  const defaultStyles = "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors";

  return (
    <a
      href={href}
      // cn() merges default styles with any custom className passed as a prop
      className={cn(defaultStyles, className)}
      {...props} // Forwards remaining attributes (target="_blank", rel, id, etc.)
    >
      {children}
    </a>
  );
}
