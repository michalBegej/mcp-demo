using System.ComponentModel;
using System.Net;
using System.Text.Json;
using commercetools.Base.Client.Error;
using commercetools.Sdk.Api.Models.Orders;
using McpDemo.Server.Commercetools;
using ModelContextProtocol.Server;

namespace McpDemo.Server.Tools;

internal sealed class GetOrderTool
{
    private readonly IOrderService _orderService;

    public GetOrderTool(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [McpServerTool(Name = "get_order_by_id")]
    [Description("Returns order details for the given order ID. The order ID is a unique identifier for an order in the system.")]
    public async Task<string> GetOrderById(
        [Description("The order ID to get the order details for.")]
        string orderId, CancellationToken cancellationToken = default)
    {
        try
        {
            IOrder order = await _orderService.GetOrderByIdAsync(orderId, cancellationToken);

            return JsonSerializer.Serialize(new
            {
                Summary = " Order details retrieved successfully.",
                Order = order
            });
        }
        catch (ApiClientException ex)
        {
            if (ex.StatusCode == (int)HttpStatusCode.NotFound) return JsonSerializer.Serialize(new { Summary = "Order with provided ID was not found." });

            return JsonSerializer.Serialize(new { Summary = "Cannot return order with provided Id, please try again later" });
        }
    }
}