using McpDemo.Server.Commercetools;
using McpDemo.Server.Tools;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddCommercetools(builder.Configuration);

IMcpServerBuilder mcpBuilder = builder.Services.AddMcpServer()
    .WithHttpTransport();

mcpBuilder
    .WithTools<HelloWorldTool>()
    .WithTools<GetOrderTool>();

WebApplication app = builder.Build();

app.UseCors();

app.MapMcp("mcp");

app.MapGet("/", () => "DemoMcp Server is running. Use /mcp endpoint for MCP requests.");

app.Run();