import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ children, language = "csharp", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      {title && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 border-b text-sm font-medium text-muted-foreground">
          <span>{title}</span>
          <span className="text-xs opacity-60">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={cn("overflow-x-auto", title ? "rounded-t-none" : "")}>
          <code>{children}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}