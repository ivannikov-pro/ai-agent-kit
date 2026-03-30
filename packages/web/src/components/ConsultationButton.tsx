import React from "react";
import { getExternalLinkProps } from "../utils/getExternalLinkProps";


export function ConsultationButton({
  children = "Book a Consultation",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="https://ivannikov.pro/services/consultation"
      {...getExternalLinkProps()}
      className={`inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm border border-transparent ${className}`.trim()}
    >
      {children}
    </a>
  );
}
