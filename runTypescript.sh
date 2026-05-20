#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

if [ ! -d "$REPO_ROOT/typescript/node_modules" ]; then
  echo "Installing dependencies ..."
  npm install --prefix "$REPO_ROOT/typescript"
fi

echo "Starting TypeScript MCP server on http://localhost:7020/mcp ..."
cd "$REPO_ROOT/typescript" && npx tsx src/index.ts &
SERVER_PID=$!

sleep 3

echo "Starting MCP Inspector ..."
npx @modelcontextprotocol/inspector --server-url http://localhost:7020/mcp

kill $SERVER_PID 2>/dev/null
