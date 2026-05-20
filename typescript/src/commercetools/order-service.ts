import type { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk";
import type { Order } from "@commercetools/platform-sdk";

export interface OrderService {
  getOrderById(orderId: string): Promise<Order>;
}

export function createOrderService(
  apiRoot: ByProjectKeyRequestBuilder
): OrderService {
  return {
    async getOrderById(orderId: string): Promise<Order> {
      const response = await apiRoot
        .orders()
        .withId({ ID: orderId })
        .get()
        .execute();

      return response.body;
    },
  };
}
