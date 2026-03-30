"use client";

import { useState } from "react";

import { IconCheck } from "./icons/IconCheck";
import { IconCopy } from "./icons/IconCopy";



type CopyableCommandProps = {
  command: string;
  className?: string;
  prefix?: string;
};


export function CopyableCommand({
  command,
  className = "",
  prefix = "$",
}: CopyableCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <code
      onClick={handleCopy}
      className={`relative group cursor-pointer inline-flex items-center ${className} pr-10`}
      title="Click to copy"
    >
      {prefix && (
        <span className="text-slate-400 mr-2 select-none font-mono">
          {prefix}
        </span>
      )}
      <span className="font-mono">{command}</span>

      <span
        className={`absolute right-3 flex items-center justify-center transition-all duration-200 ${
          copied ? "text-emerald-500 opacity-100 scale-110" : "text-slate-400 opacity-0 group-hover:opacity-100 scale-100"
        }`}
      >
        {copied ? (
          <IconCheck className="w-4 h-4" />
        ) : (
          <IconCopy className="w-4 h-4" />
        )}
      </span>
    </code>
  );
}
