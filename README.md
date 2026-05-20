# MCP Demo

A simple demo showing how to build a [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server
that exposes tools for AI agents. The repository contains two custom implementations — .NET and TypeScript —
each providing the same MCP tools over Streamable HTTP transport. Additionally, it includes a pre-built
[commercetools Commerce MCP](https://github.com/commercetools/commerce-mcp) server wrapped with an HTTP layer.

All servers integrate with the [commercetools](https://commercetools.com/) platform to demonstrate
a real-world use case: retrieving order data through MCP tools.

> **Warning**
> This is a demo project. Authorization is **completely skipped** in both custom implementations.
> In a production environment you must implement the MCP authorization flow.
> See the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)
> for details on how to secure MCP servers using OAuth 2.1.

## Servers

| Server | Port | Description |
|---|---|---|
| .NET | 7010 | Custom MCP server built with ASP.NET Core |
| TypeScript | 7020 | Custom MCP server built with Node.js |
| commercetools MCP | 7030 | Official `@commercetools/commerce-mcp` with HTTP transport |

### Custom server tools

| Tool | Description |
|---|---|
| `hello_world` | Returns a greeting message. Useful for verifying the server is working. |
| `get_order_by_id` | Retrieves order details from commercetools by order ID. |

The commercetools MCP server provides its own set of tools for interacting with the commercetools platform.
See the [commerce-mcp documentation](https://docs.commercetools.com/sdk/mcp/commerce-mcp) for details.

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
├── commercetools-mcp/          # Official commercetools MCP server
│   ├── runCommercetools.sh     # Start server (called by root script)
│   └── .env.example            # Credentials template
├── .mcp.json                   # MCP client config for Claude Code
├── runDotnet.sh                # Start .NET server + Inspector
├── runTypescript.sh            # Start TypeScript server + Inspector
└── runCommercetools.sh         # Start commercetools MCP server + Inspector
```

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) (for .NET server)
- [Node.js 20+](https://nodejs.org/) (for TypeScript and commercetools MCP server)
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

#### commercetools MCP

```bash
cp commercetools-mcp/.env.example commercetools-mcp/.env
```

```env
CT_CLIENT_ID=<your-client-id>
CT_CLIENT_SECRET=<your-client-secret>
CT_PROJECT_KEY=<your-project-key>
CT_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com
CT_API_URL=https://api.europe-west1.gcp.commercetools.com
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

### commercetools MCP server (port 7030)

```bash
./runCommercetools.sh
```

### Manual start (without Inspector)

If you want to run a server on its own:

```bash
# .NET
dotnet run --project dotnet/McpDemo.Server

# TypeScript
cd typescript && npm run dev

# commercetools MCP
./commercetools-mcp/runCommercetools.sh
```

## Using with Claude Code

The `.mcp.json` file at the repository root is pre-configured to connect Claude Code to all three servers.
Start one or more servers, then use the MCP tools directly from Claude Code.

## Tech stack

| | .NET | TypeScript | commercetools MCP |
|---|---|---|---|
| **Runtime** | .NET 9 / ASP.NET Core | Node.js 20+ | Node.js 20+ |
| **MCP SDK** | `ModelContextProtocol.AspNetCore` 1.3.0 | `@modelcontextprotocol/sdk` 1.12.1 | `@commercetools/commerce-mcp` |
| **commercetools SDK** | `commercetools.Sdk.Api` 15.2.0 | `@commercetools/platform-sdk` 8.25.0 | Built-in |
| **Transport** | Streamable HTTP (`/mcp`) | Streamable HTTP (`/mcp`) | Streamable HTTP (`/mcp`) |
