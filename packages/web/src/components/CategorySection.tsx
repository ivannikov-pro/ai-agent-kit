import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

export function CategorySection({
  id,
  title,
  color,
  count,
  show = true,
  delayClass = "animate-fade-in-up-delay-2",
  emptyState,
  children,
}: {
  id: string;
  title: string;
  color: string;
  count: number;
  show?: boolean;
  delayClass?: string;
  emptyState?: ReactNode;
  children?: ReactNode;
}) {
  if (!show) return null;

  return (
    <section className={`scroll-mt-24 mb-20 ${delayClass}`} id={id}>
      <SectionHeader color={color} title={title} count={count} />

      {count === 0 && emptyState ? (
        emptyState
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      )}
    </section>
  );
}
