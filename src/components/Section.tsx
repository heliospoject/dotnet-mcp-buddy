import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export function Section({ id, title, children, level = 1, className }: SectionProps) {
  const HeadingTag = `h${level + 1}` as keyof JSX.IntrinsicElements;
  
  const headingClasses = {
    1: "text-3xl font-bold mb-6",
    2: "text-2xl font-semibold mb-4 mt-8",
    3: "text-xl font-medium mb-3 mt-6"
  };

  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <HeadingTag className={cn(headingClasses[level], "text-foreground")}>
        {title}
      </HeadingTag>
      <div className="prose prose-slate max-w-none">
        {children}
      </div>
    </section>
  );
}

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  children: ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800", 
    tip: "bg-green-50 border-green-200 text-green-800",
    danger: "bg-red-50 border-red-200 text-red-800"
  };

  return (
    <div className={cn("p-4 rounded-lg border-l-4 my-4", styles[type])}>
      {children}
    </div>
  );
}