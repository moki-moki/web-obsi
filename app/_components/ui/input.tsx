import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    return (
      <input
        className="border border-gray rounded-full p-2 px-4 bg-black outline-none my-2 text-white"
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
