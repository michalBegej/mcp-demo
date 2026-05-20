import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { OrderService } from "../commercetools/order-service.js";

export function registerGetOrderTool(
  server: McpServer,
  orderService: OrderService
): void {
  server.registerTool(
    "get_order_by_id",
    {
      description:
        "Returns order details for the given order ID. The order ID is a unique identifier for an order in the system.",
      inputSchema: {
        orderId: z
          .string()
          .describe("The order ID to get the order details for."),
      },
    },
    async ({ orderId }) => {
      try {
        const order = await orderService.getOrderById(orderId);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                Summary: "Order details retrieved successfully.",
                Order: order,
              }),
            },
          ],
        };
      } catch (error: unknown) {
        const statusCode =
          error instanceof Error && "statusCode" in error
            ? (error as { statusCode: number }).statusCode
            : undefined;

        if (statusCode === 404) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  Summary: "Order with provided ID was not found.",
                }),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                Summary:
                  "Cannot return order with provided Id, please try again later",
              }),
            },
          ],
        };
      }
    }
  );
}
