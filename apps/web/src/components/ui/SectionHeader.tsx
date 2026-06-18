import type { ReactNode } from "react";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="space-y-2">
        <p className={frontendLayout.sectionEyebrow}>{eyebrow}</p>
        <h2 className={frontendLayout.sectionTitle}>{title}</h2>
        {description ? (
          <p className={frontendLayout.sectionDescription}>{description}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
