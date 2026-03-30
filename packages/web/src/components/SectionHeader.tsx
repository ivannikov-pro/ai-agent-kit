export function SectionHeader({
  color,
  title,
  count,
  suffix = "available",
}: {
  color: string;
  title: string;
  count: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <span className="text-xs text-slate-400">
        {count > 0 ? `${count} ${suffix}` : "Coming soon"}
      </span>
    </div>
  );
}
