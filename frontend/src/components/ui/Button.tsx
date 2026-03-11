import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_VARIENT_CLASS_NAME = {
  primary:
    "bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
  secondary:
    "bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white",
  danger:
    "bg-red-400 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 text-white"
};

const Button = ({
  variant = "secondary",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded transition-colors ${BUTTON_VARIENT_CLASS_NAME[variant]} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
