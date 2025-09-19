import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "why-mcp", title: "Why MCP?", level: 1 },
  { id: "prerequisites", title: "Prerequisites", level: 1 },
  { id: "mental-model", title: "Mental Model", level: 1 },
  { id: "path-a", title: "Path A - STDIO Server", level: 1 },
  { id: "create-project", title: "Create Project", level: 2 },
  { id: "program-cs", title: "Program.cs Setup", level: 2 },
  { id: "vs-code-setup", title: "VS Code Setup", level: 2 },
  { id: "path-b", title: "Path B - Remote Server", level: 1 },
  { id: "web-app", title: "Web App Setup", level: 2 },
  { id: "sse-endpoints", title: "SSE Endpoints", level: 2 },
  { id: "useful-tools", title: "Making Tools Useful", level: 1 },
  { id: "configuration", title: "Configuration & Secrets", level: 1 },
  { id: "observability", title: "Observability", level: 1 },
  { id: "packaging", title: "Packaging Options", level: 1 },
  { id: "security", title: "Security Basics", level: 1 },
  { id: "transport-choice", title: "Transport Choice", level: 1 },
  { id: "checklists", title: "Checklists", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-24 space-y-1">
      <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
        Contents
      </h4>
      <nav className="space-y-1">
        {tocItems.map(({ id, title, level }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-primary",
              level === 1 ? "font-medium" : "ml-4 text-muted-foreground",
              activeId === id ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            {title}
          </button>
        ))}
      </nav>
    </div>
  );
}