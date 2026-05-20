# MCP Demo

A simple demo showing how to build a [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server
that exposes tools for AI agents. The repository contains two identical implementations — .NET and TypeScript —
each providing the same MCP tools over Streamable HTTP transport.

Both servers integrate with the [commercetools](https://commercetools.com/) platform to demonstrate
a real-world use case: retrieving order data through MCP tools.

> **Warning**
> This is a demo project. Authorization is **completely skipped** in both implementations.
> In a production environment you must implement the MCP authorization flow.
> See the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)
> for details on how to secure MCP servers using OAuth 2.1.

## Tools

| Tool | Description |
|---|---|
| `hello_world` | Returns a greeting message. Useful for verifying the server is working. |
| `get_order_by_id` | Retrieves order details from commercetools by order ID. |

## Project structure

```text
.
├── dotnet/                     # .NET 9 implementation
│   └── McpDemo.Server/
│       ├── Program.cs          # ASP.NET Core host, MCP setup
│       ├── Tools/              # MCP tool definitions
│       └── Commercetools/      # commercetools client & services
├── typescript/                 # TypeScript implementation
│   └── src/
│       ├── index.ts            # HTTP server, MCP setup
│       ├── tools/              # MCP tool definitions
│       └── commercetools/      # commercetools client & services
├── .mcp.json                   # MCP client config for Claude Code
├── runDotnet.sh                # Start .NET server
└── runTypescript.sh            # Start TypeScript server
```

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) (for .NET server)
- [Node.js 20+](https://nodejs.org/) (for TypeScript server)
- commercetools API credentials

## Setup

### commercetools credentials

#### .NET

Edit `dotnet/McpDemo.Server/appsettings.Development.json`:

```json
{
  "CommercetoolsApi": {
    "ClientId": "<your-client-id>",
    "ClientSecret": "<your-client-secret>",
    "ProjectKey": "<your-project-key>",
    "Scopes": "<your-scopes>"
  }
}
```

#### TypeScript

Copy the example env file and fill in credentials:

```bash
cp typescript/.env.example typescript/.env
```

```env
CT_CLIENT_ID=<your-client-id>
CT_CLIENT_SECRET=<your-client-secret>
CT_PROJECT_KEY=<your-project-key>
CT_SCOPES=<your-scopes>
```

## Running

Use the provided scripts from the repository root. Each script starts the server **and** opens
[MCP Inspector](https://github.com/modelcontextprotocol/inspector) for interactive testing.
When you close the Inspector, the server shuts down automatically.

### .NET server (port 7010)

```bash
./runDotnet.sh
```

### TypeScript server (port 7020)

```bash
./runTypescript.sh
```

The script automatically installs dependencies on first run.

### Manual start (without Inspector)

If you want to run a server on its own:

```bash
# .NET
dotnet run --project dotnet/McpDemo.Server

# TypeScript
cd typescript && npm run dev
```

## Using with Claude Code

The `.mcp.json` file at the repository root is pre-configured to connect Claude Code to both servers.
Start one or both servers, then use the MCP tools directly from Claude Code.

## Tech stack

| | .NET | TypeScript |
|---|---|---|
| **Runtime** | .NET 9 / ASP.NET Core | Node.js 20+ |
| **MCP SDK** | `ModelContextProtocol.AspNetCore` 1.3.0 | `@modelcontextprotocol/sdk` 1.12.1 |
| **commercetools SDK** | `commercetools.Sdk.Api` 15.2.0 | `@commercetools/platform-sdk` 8.25.0 |
| **Transport** | Streamable HTTP (`/mcp`) | Streamable HTTP (`/mcp`) |
