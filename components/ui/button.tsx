import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-semibold leading-none tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-on shadow-card hover:bg-brand [&_svg]:text-brand-on [&_svg]:transition-transform',
        default:
          'bg-brand text-brand-on shadow-card hover:bg-brand [&_svg]:text-brand-on [&_svg]:transition-transform',
        secondary:
          'bg-ink text-white hover:bg-ink/90 [&_svg]:text-white [&_svg]:transition-transform',
        outline:
          'border border-border bg-white text-ink hover:border-ink hover:bg-surface [&_svg]:text-ink [&_svg]:transition-transform',
        ghost: 'text-text hover:bg-surface',
        destructive: 'bg-[#dc2626] text-white hover:bg-[#b91c1c]',
        link: 'rounded-none h-auto px-0 text-brand-ink underline decoration-brand/70 decoration-[1.5px] underline-offset-4 hover:text-brand-dark hover:decoration-brand',
      },
      size: {
        sm: 'h-10 px-5 text-[14px]',
        md: 'h-11 px-6 text-[15px]',
        default: 'h-11 px-6 text-[15px]',
        lg: 'h-[3.25rem] min-w-[220px] px-8 text-[16px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
