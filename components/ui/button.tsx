import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-on hover:bg-brand-ink focus-visible:ring-brand text-[19px] font-bold leading-[1.2] [&_svg]:text-brand-on",
        default:
          "bg-brand text-brand-on hover:bg-brand-ink focus-visible:ring-brand text-[19px] font-bold leading-[1.2] [&_svg]:text-brand-on",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-brand text-brand-ink hover:bg-brand-soft focus-visible:ring-brand",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-ink/90",
      },
      size: {
        default: "h-auto px-6 py-3 rounded-full",
        sm: "h-auto px-5 py-2.5 rounded-full",
        lg: "h-auto px-8 py-4 rounded-full",
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