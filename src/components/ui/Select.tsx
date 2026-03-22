import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'gold'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <select
          className={cn(
            'input appearance-none pr-10',
            variant === 'gold' && 'input-gold',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400 transition-colors duration-200 group-focus-within:text-gold-dark" />
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
