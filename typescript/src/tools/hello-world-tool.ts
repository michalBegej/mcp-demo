import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerHelloWorldTool(server: McpServer): void {
  server.registerTool(
    "hello_world",
    {
      description:
        "Returns a greeting message with the provided name. If name is not provided, it defaults to 'World'.",
      inputSchema: {
        name: z
          .string()
          .default("World")
          .describe("Name for greeting, for example 'Alice'. If not provided, it defaults to 'World'."),
      },
    },
    async ({ name }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            Name: name,
            Message: `Hello, ${name} from typescript server!`,
          }),
        },
      ],
    })
  );
}
