using commercetools.Base.Client;
using commercetools.Sdk.Api;

namespace McpDemo.Server.Commercetools;

internal static class Extensions
{
    public static IServiceCollection AddCommercetools(this IServiceCollection services, IConfiguration configuration)
    {
        services.UseCommercetoolsApi(configuration);

        services.AddSingleton<IClientConfiguration, ClientConfiguration>(_ =>
        {
            ClientConfiguration? clientConfiguration = configuration.GetSection("CommercetoolsApi").Get<ClientConfiguration>();
            return clientConfiguration ?? throw new Exception("Commercetools client is not configured!");
        });

        services.AddScoped<IOrderService, CommercetoolsOrderService>();

        return services;
    }
}