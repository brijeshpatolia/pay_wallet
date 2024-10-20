"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;  // Add the disabled prop
}

export const Button = ({ onClick, children, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}  // Pass the disabled prop to the button element
      type="button"
      className={`text-white bg-[#6a51a6] hover:bg-[#5a41a0] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}  // Add conditional styling for disabled state
    >
      {children}
    </button>
  );
};
