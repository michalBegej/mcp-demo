import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "node:http";
import {
  loadCommercetoolsConfig,
  createCommercetoolsClient,
} from "./commercetools/client.js";
import { createOrderService } from "./commercetools/order-service.js";
import type { OrderService } from "./commercetools/order-service.js";
import { registerHelloWorldTool } from "./tools/hello-world-tool.js";
import { registerGetOrderTool } from "./tools/get-order-tool.js";

let orderService: OrderService | undefined;

try {
  const config = loadCommercetoolsConfig();
  const apiRoot = createCommercetoolsClient(config);
  orderService = createOrderService(apiRoot);
} catch (error) {
  console.warn(
    `Commercetools: ${error instanceof Error ? error.message : error}`
  );
}

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "mcp-demo-typescript",
    version: "1.0.0",
  });

  registerHelloWorldTool(server);

  if (orderService) {
    registerGetOrderTool(server, orderService);
  }

  return server;
}

const httpServer = createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "McpDemo TypeScript Server is running. Use /mcp endpoint for MCP requests."
    );
    return;
  }

  if (req.url === "/mcp") {
    const server = createMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

const port = 7020;
httpServer.listen(port, () => {
  console.log(`MCP TypeScript server running at http://localhost:${port}`);
  console.log(`MCP endpoint: http://localhost:${port}/mcp`);
});
