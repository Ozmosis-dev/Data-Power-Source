import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-small font-semibold transition-[background-color,border-color,color,transform] duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]",
        dark: "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]",
        outline:
          "border border-neutral-200 bg-transparent text-navy-800 hover:border-blue-200 hover:bg-blue-50",
        "outline-dark":
          "border border-navy-600 bg-transparent text-neutral-50 hover:border-blue-300 hover:bg-navy-700",
        ghost: "text-navy-800 hover:bg-brand-50",
      },
      size: {
        default: "h-11 px-5",
        compact: "h-9 px-4 text-small",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  },
);
Button.displayName = "Button";

export { buttonVariants };
