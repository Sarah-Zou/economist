import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-on hover:bg-brand-ink [&_svg]:text-brand-on",
        default:
          "bg-brand text-brand-on hover:bg-brand-ink [&_svg]:text-brand-on",
        secondary:
          "bg-ink text-white hover:bg-ink/90 [&_svg]:text-white",
        outline:
          "border border-border-subtle bg-white text-text hover:border-ink/30 hover:bg-surface [&_svg]:text-text",
        ghost:
          "text-text hover:bg-surface",
        destructive:
          "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
        link:
          "rounded-none px-0 h-auto text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark",
      },
      size: {
        sm: "h-10 px-5 text-[14px]",
        md: "h-11 px-6 text-[15px]",
        default: "h-11 px-6 text-[15px]",
        lg: "h-12 px-7 text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
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
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
