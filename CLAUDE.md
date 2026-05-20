# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCP (Model Context Protocol) demo server built with .NET 9 and ASP.NET Core. Exposes MCP tools over HTTP transport that allow AI agents to interact with commercetools APIs. Currently provides order retrieval from commercetools.

## Build and Run

```bash
# Build
cd dotnet && dotnet build

# Run server (http://localhost:5195, MCP endpoint at /mcp)
cd dotnet/McpDemo.Server && dotnet run

# Test MCP tools with inspector
npx @modelcontextprotocol/inspector
```

No test projects exist yet. Solution file: `dotnet/McpDemo.sln`.

## Architecture

**MCP Server** (`dotnet/McpDemo.Server/`) — ASP.NET Core web app using `ModelContextProtocol.AspNetCore` (v1.3.0) with HTTP transport mapped at `/mcp`.

**Tools** (`Tools/`) — MCP tool classes discovered via `WithTools<T>()` registration in `Program.cs`. Each tool class contains methods annotated with `[McpServerTool]` and `[Description]`. Tools return serialized JSON strings.

**Commercetools integration** (`Commercetools/`) — Uses `commercetools.Sdk.Api` (v15.2.0). Service interfaces + implementations registered through `Extensions.AddCommercetools()`. Config section: `CommercetoolsApi` in appsettings.

## Adding a New MCP Tool

1. Create tool class in `Tools/` with `[McpServerTool(Name = "snake_case_name")]` method
2. If it needs external services, use constructor injection
3. Register in `Program.cs` via `mcpBuilder.WithTools<YourTool>()`

## Configuration

commercetools credentials in `appsettings.Development.json` under `CommercetoolsApi` (ClientId, ClientSecret, ProjectKey, Scopes). Region: `europe-west1.gcp`.

## MCP Client Config

`.mcp.json` at repo root configures Claude Code to connect to local server at `http://localhost:5195/mcp`.
