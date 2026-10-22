import type { LucideIcon } from 'lucide-react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'ghost';
}

export function Button({ icon: Icon, variant = 'ghost', className = '', children, ...rest }: Props) {
  return (
    <a className={`btn btn--${variant} ${className}`} {...rest}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </a>
  );
}
