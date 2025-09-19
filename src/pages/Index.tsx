import { Header } from "@/components/Header";
import { TableOfContents } from "@/components/TableOfContents";
import { Section, Callout } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Zap, Shield, Package, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-accent/30 to-background">
        <div className="container py-16">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                .NET Development
              </Badge>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                AI Integration
              </Badge>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build an MCP Server in .NET
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn to build a production-ready MCP server in .NET: tools, prompts, STDIO vs SSE, 
              VS Code integration, auth, and packaging tips. From prototype to production in minutes.
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="flex gap-12">
          {/* Content */}
          <main className="flex-1 max-w-4xl">
            
            <Section id="why-mcp" title="Why MCP (and why now)?">
              <p className="text-lg mb-4">
                If you've ever glued an LLM to a database or a SaaS API, you probably hand-rolled a mini-protocol: 
                ad-hoc JSON in, string out, and a prayer. That doesn't scale.
              </p>
              <p className="mb-6">
                <strong>Model Context Protocol (MCP)</strong> standardizes how AI apps discover and call your 
                capabilities ("tools"), read contextual resources, and consume reusable prompts – over well-defined 
                transports (stdio or HTTP/SSE). The result: one integration, many clients (Copilot Chat in VS Code, 
                Claude Desktop, and others).
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-2">
                      <Server className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Server</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Your code exposing tools/resources/prompts
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      A process that connects to your server
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-2">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Host</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      The app that "owns" the client (e.g., VS Code Copilot)
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </Section>

            <Section id="prerequisites" title="Prerequisites">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>.NET 8+</strong> (works great). For official MCP templates, use .NET 10 preview.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>VS Code</strong> with GitHub Copilot Chat (Agent Mode) or any MCP-capable host.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Basic <strong>C#</strong> and console/ASP.NET Core experience.</span>
                </li>
              </ul>
            </Section>

            <Section id="mental-model" title="Quick MCP Mental Model" level={2}>
              <div className="bg-muted/50 p-6 rounded-lg mb-6">
                <p className="mb-4"><strong>Transports:</strong></p>
                <ul className="space-y-2">
                  <li><strong>STDIO</strong> for local dev – fast and simple.</li>
                  <li><strong>Streamable HTTP (SSE)</strong> for remote servers, auth headers, multiple clients.</li>
                </ul>
              </div>
            </Section>

            <Section id="path-a" title="Path A – Minimal STDIO server (pure console)">
              <p className="mb-6">
                We'll start with a tiny server that exposes two tools: <code>echo</code> and <code>reverse_echo</code>.
              </p>
              
              <Section id="create-project" title="1) Create the project & add packages" level={2}>
                <CodeBlock title="Terminal Commands" language="bash">
{`mkdir MyMcpServer && cd MyMcpServer
dotnet new console -n MyMcpServer
cd MyMcpServer
# MCP SDK + hosting
dotnet add package ModelContextProtocol --prerelease
dotnet add package Microsoft.Extensions.Hosting`}
                </CodeBlock>
              </Section>

              <Section id="program-cs" title="2) Program.cs – boot the MCP server" level={2}>
                <CodeBlock title="Program.cs" language="csharp">
{`using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

// Route logs to stderr so MCP hosts don't parse them as JSON-RPC
builder.Logging.AddConsole(o => o.LogToStandardErrorThreshold = LogLevel.Trace);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()  // run as a local process via stdio
    .WithToolsFromAssembly()     // discover [McpServerTool] in this assembly
    .WithPromptsFromAssembly();  // discover [McpServerPrompt]

await builder.Build().RunAsync();

// ===== Tools =====
[McpServerToolType]
public static class EchoTools
{
    [McpServerTool, Description("Echoes the message back to the client.")]
    public static string Echo([Description("Message to echo")] string message)
        => $"Hello from .NET: {message}";

    [McpServerTool(Name = "reverse_echo"), Description("Returns the reversed message.")]
    public static string ReverseEcho([Description("Message to reverse")] string message)
        => new string(message.Reverse().ToArray());
}

// ===== Prompts =====
[McpServerPromptType]
public static class DemoPrompts
{
    [McpServerPrompt, Description("Create a succinct summary prompt for given text.")]
    public static ChatMessage Summarize([Description("Text to summarize")] string content)
        => new(ChatRole.User, $"Please summarize in one sentence: {content}");
}`}
                </CodeBlock>
                
                <Callout type="tip">
                  <p><strong>What this does:</strong></p>
                  <ul className="mt-2 space-y-1">
                    <li>• Spins up an MCP server over STDIO</li>
                    <li>• Discovers any public static methods marked with [McpServerTool]</li>
                    <li>• Discovers [McpServerPrompt] for reusable prompts</li>
                    <li>• Tools can use DI: add HttpClient, config, or even the server instance (IMcpServer) as parameters</li>
                  </ul>
                </Callout>
              </Section>

              <Section id="vs-code-setup" title="3) Run it in VS Code (Copilot Agent Mode)" level={2}>
                <p className="mb-4">Create <code>.vscode/mcp.json</code> alongside your .sln/.csproj:</p>
                <CodeBlock title=".vscode/mcp.json" language="json">
{`{
  "servers": {
    "MyMcpServer": {
      "type": "stdio",
      "command": "dotnet",
      "args": ["run", "--project", "./MyMcpServer.csproj"]
    }
  }
}`}
                </CodeBlock>
                
                <p className="mt-4">
                  Now open Copilot Chat, toggle Agent Mode, enable your server in the Tools picker, and try:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4 italic">
                  "Using #reverse_echo, reverse 'S.O.L.I.D.' and show the result."
                </div>
              </Section>
            </Section>

            <Section id="path-b" title="Path B – Remote server (ASP.NET Core + SSE)">
              <p className="mb-6">
                STDIO is perfect locally. For shared/team scenarios or multi-client access, run your server over HTTP + SSE.
              </p>
              
              <Section id="web-app" title="1) New web app + package" level={2}>
                <CodeBlock title="Terminal Commands" language="bash">
{`dotnet new web -n MyMcpSseServer
cd MyMcpSseServer
# ASP.NET Core transport for MCP
dotnet add package ModelContextProtocol.AspNetCore --prerelease`}
                </CodeBlock>
              </Section>

              <Section id="sse-endpoints" title="2) Program.cs – map the MCP endpoints" level={2}>
                <CodeBlock title="Program.cs" language="csharp">
{`using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddMcpServer()
    .WithToolsFromAssembly()     // reuse our attribute-based tools
    .WithPromptsFromAssembly();

var app = builder.Build();

// Exposes /messages (POST) and /sse (GET) endpoints for MCP Streamable HTTP
app.MapMcp();

app.Run();

// Example tool (same pattern as before)
[McpServerToolType]
public static class TimeTools
{
    [McpServerTool, Description("Gets the current server time in ISO-8601.")]
    public static string Now() => DateTimeOffset.UtcNow.ToString("O");
}`}
                </CodeBlock>
              </Section>
            </Section>

          </main>

          {/* Table of Contents */}
          <aside className="w-64 shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;
