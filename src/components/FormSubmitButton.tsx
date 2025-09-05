"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...otherProps
}: FormSubmitButtonProps) {
  const status = useFormStatus();
  return (
    <button
      className={`btn btn-primary ${className}`}
      disabled={status.pending}
      type="submit"
      {...otherProps}
    >
      {status.pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
