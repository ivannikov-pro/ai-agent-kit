"use client";

import Link from "next/link";

import { Badge, typeConfig } from "./Badge";
import { CopyableCommand } from "./CopyableCommand";



export function ItemCard({
  href,
  name,
  type,
  description,
  tags,
  tools,
  command,
}: {
  href: string;
  name: string;
  type: "skill" | "workflow" | "mcp server";
  description: string;
  tags?: string[];
  tools?: string[];
  command: string;
}) {
  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <Link
      href={href}
      className={`group flex flex-col h-full p-6 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all duration-200 no-underline ${cfg.cardHover}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-base font-semibold text-slate-900 transition-colors ${cfg.titleHover}`}>
          {name}
        </h3>
        <Badge type={type} label={type} />
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
        {description.split(".")[0]}.
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${cfg.bg} ${cfg.color}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[11px] px-1.5 py-0.5 rounded bg-black/5 text-slate-400 font-mono"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-5">
        <CopyableCommand
          className={`text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-md transition-colors inline-flex ${cfg.cmdText}`}
          command={command}
        />
      </div>
    </Link>
  );
}
