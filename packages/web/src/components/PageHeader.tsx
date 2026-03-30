import Link from "next/link";

import { CopyableCommand } from "./CopyableCommand";
import { type BadgeType, typeConfig } from "./Badge";
import { IconArrowLeft } from "./icons/IconArrowLeft";



export type PageHeaderProps = {
  name: string;
  type: BadgeType;
  description: string;
  version?: string;
  author?: string;
  license?: string;
  category?: string;
  tags?: string[];
  command: string;
};


export function PageHeader({
  name,
  type,
  description,
  version,
  author,
  license,
  category,
  tags,
  command,
}: PageHeaderProps) {
  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <>
      <nav className="mb-8 animate-fade-in-up">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-500 transition-colors group"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to catalog
        </Link>
      </nav>

      <header className="mb-12 animate-fade-in-up-delay-1">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider ${cfg.color} ${cfg.bg} ${cfg.border}`}>
            {type}
          </span>
        </div>

        <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
          {description.split(".").slice(0, 2).join(".")}.
        </p>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2.5 mt-6">
          {version && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-medium">
              v{version}
            </span>
          )}
          {author && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-medium">
              by {author}
            </span>
          )}
          {license && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-medium">
              {license}
            </span>
          )}
          {category && (
            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${typeConfig.workflow.bg} ${typeConfig.workflow.color} ${typeConfig.workflow.border}`}>
              {category}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-500 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Install command */}
        <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400 mb-2 uppercase tracking-wider font-medium">
            Install this {type}
          </div>
          <CopyableCommand
            className="text-sm text-indigo-500"
            command={command}
          />
        </div>
      </header>
    </>
  );
}
