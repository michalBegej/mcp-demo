#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

echo "Starting .NET MCP server on http://localhost:7010/mcp ..."
dotnet run --project "$REPO_ROOT/dotnet/src/McpDemo.Server" &
SERVER_PID=$!

sleep 3

echo "Starting MCP Inspector ..."
npx @modelcontextprotocol/inspector --server-url http://localhost:7010/mcp

kill $SERVER_PID 2>/dev/null
