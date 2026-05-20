using commercetools.Base.Client;
using commercetools.Sdk.Api.Extensions;
using commercetools.Sdk.Api.Models.Orders;

namespace McpDemo.Server.Commercetools;

internal interface IOrderService
{
    Task<IOrder> GetOrderByIdAsync(string orderId, CancellationToken cancellationToken = default);
}

internal sealed class CommercetoolsOrderService : IOrderService
{
    private readonly IClient _client;
    private readonly IClientConfiguration _clientConfiguration;

    public CommercetoolsOrderService(
        IClient client,
        IClientConfiguration clientConfiguration
    )
    {
        _client = client;
        _clientConfiguration = clientConfiguration;
    }

    public async Task<IOrder> GetOrderByIdAsync(string orderId, CancellationToken cancellationToken = default)
    {
        return await _client
            .WithApi()
            .WithProjectKey(_clientConfiguration.ProjectKey)
            .Orders()
            .WithId(orderId)
            .Get()
            .ExecuteAsync(cancellationToken);
    }
}