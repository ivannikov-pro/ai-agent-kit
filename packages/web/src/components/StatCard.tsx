"use client";


export function StatCard({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1.5 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}
