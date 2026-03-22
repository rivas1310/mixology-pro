import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="group relative w-full">
        <input
          type={type}
          className={cn(
            'input',
            icon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 transition-colors group-focus-within:text-gold-dark">
            {icon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
