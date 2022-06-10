using System.Text.Json;
using message_hub.api;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration, "Serilog")
            //.WriteTo.Seq("http://localhost:5341", apiKey: "lAloTffsLMW4TIA7jBN3")
            .CreateLogger();

try
{
    Log.Information("Starting web host");

    builder.Services.AddControllers();
    
    builder.Services.AddSignalR()
        .AddJsonProtocol(conf => conf.PayloadSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddSwaggerGen();

    builder.Host.UseSerilog();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseCors(p => p.AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials()
                      .WithOrigins("https://localhost:3000"));

    app.UseAuthorization();

    app.MapControllers();

    app.MapHub<MessageHub>("/messagehub");

    app.Run();

} catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");

} finally
{
    Log.CloseAndFlush();

}
