export type BadgeType = "skill" | "workflow" | "mcp server";


export const typeConfig: Record<string, {
  color: string;
  bg: string;
  border: string;
  cardHover: string;
  titleHover: string;
  cmdText: string;
}> = {
  skill: {
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
    cardHover: "hover:border-cyan-500/30",
    titleHover: "group-hover:text-cyan-600",
    cmdText: "text-cyan-600 hover:border-cyan-500/30",
  },
  workflow: {
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    cardHover: "hover:border-purple-500/30",
    titleHover: "group-hover:text-purple-600",
    cmdText: "text-purple-600 hover:border-purple-500/30",
  },
  "mcp server": {
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    cardHover: "hover:border-emerald-500/30",
    titleHover: "group-hover:text-emerald-600",
    cmdText: "text-emerald-600 hover:border-emerald-500/30",
  },
};


export function Badge({
  type,
  label,
}: {
  type: string;
  label: string;
}) {
  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {label}
    </span>
  );
}
