import { cn } from "@/app/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const inputVariants = cva(
  "bg-dark-gray-accent outline-none text-gray w-full p-2 border border-border",
  {
    variants: {
      variants: {
        default: "bg-dark-gray-accent",
      },
      rounded: {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variants: "default",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, rounded, variants, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variants, rounded, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
