"use client";

import { ReactNode } from "react";

type Variant = "primary" | "outline";

interface ButtonProps {
  children: ReactNode;
  variant: Variant;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
}

const getVariant = (variant: Variant) => {
  const base =
    "flex justify-center items-center gap-2 rounded-full font-bold px-4 py-2 text-nowrap disabled:opacity-75 cursor-pointer";

  switch (variant) {
    case "primary":
      return `${base} bg-black text-white`;
    case "outline":
      return `${base} bg-white text-black border-black border`;
  }
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const styles = getVariant(variant);

  return (
    <button
      className={`${styles} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
