#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -f "$SCRIPT_DIR/.env" ]; then
  set -a
  source "$SCRIPT_DIR/.env"
  set +a
fi

if [ -z "$CT_CLIENT_ID" ] || [ -z "$CT_CLIENT_SECRET" ] || [ -z "$CT_PROJECT_KEY" ]; then
  echo "Error: Missing required environment variables (CT_CLIENT_ID, CT_CLIENT_SECRET, CT_PROJECT_KEY)."
  echo "Copy .env.example to .env and fill in your credentials."
  exit 1
fi

CT_AUTH_URL="${CT_AUTH_URL:-https://auth.europe-west1.gcp.commercetools.com}"
CT_API_URL="${CT_API_URL:-https://api.europe-west1.gcp.commercetools.com}"

echo "Starting commercetools MCP server on http://localhost:7030/mcp ..."
npx -y @commercetools/commerce-mcp@latest \
  --remote=true \
  --stateless=true \
  --port=7030 \
  --tools=all \
  --isAdmin=true \
  --authType=client_credentials \
  --clientId="$CT_CLIENT_ID" \
  --clientSecret="$CT_CLIENT_SECRET" \
  --projectKey="$CT_PROJECT_KEY" \
  --authUrl="$CT_AUTH_URL" \
  --apiUrl="$CT_API_URL"
