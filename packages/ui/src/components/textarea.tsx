"use client";

import { ChangeEvent } from "react";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  rows?: number;
  cols?: number;
  name?: string;
  id?: string;
}

export const Textarea = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  rows = 4,
  cols,
  name,
  id,
}: TextareaProps) => {
  const baseStyles =
    "w-full rounded-lg font-medium px-4 py-3 resize-none bg-white text-black border-black border focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed";

  return (
    <textarea
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      cols={cols}
      name={name}
      id={id}
    />
  );
};
