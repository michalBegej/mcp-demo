#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

$REPO_ROOT/commercetools-mcp/runCommercetools.sh &
SERVER_PID=$!

sleep 3

echo "Starting MCP Inspector ..."
npx @modelcontextprotocol/inspector --server-url http://localhost:7030/mcp

kill $SERVER_PID 2>/dev/null
