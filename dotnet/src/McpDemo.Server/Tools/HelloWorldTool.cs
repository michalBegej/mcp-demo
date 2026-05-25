using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;

namespace McpDemo.Server.Tools;

internal sealed class HelloWorldTool
{
    [McpServerTool(Name = "hello_world")]
    [Description("Returns a greeting message with the provided name. If name is not provided, it defaults to 'World'.")]
    public CallToolResult ExecuteAsync(
        [Description("Name for gretting, for example 'Alice'. If not provided, it defaults to 'World'.")]
        string name = "World")
    {
        return new CallToolResult
        {
            IsError = false,
            Content = new List<ContentBlock>
            {
                new TextContentBlock
                {
                    Text = JsonSerializer.Serialize(new
                    {
                        Name = name,
                        Message = $"Hello, {name} from dotnet server!"
                    })
                }
            }
        };
    }
}