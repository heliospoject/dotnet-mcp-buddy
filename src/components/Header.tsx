import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MCP .NET Guide</h1>
              <p className="text-xs text-muted-foreground">Model Context Protocol</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Github className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}