using System.Text.Json;
using ltsignalr.api;
using ltsignalr.api.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration, "Serilog")
            .CreateLogger();

try
{
    Log.Information("Starting web host");

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => {
                        options.Authority = builder.Configuration["Keycloak:Authority"];
                        options.Audience = builder.Configuration["Keycloak:ClientId"];

                        options.Events = new JwtBearerEvents {
                            OnMessageReceived = context => {
                                var accessToken = context.Request.Query["access_token"];
                                var path = context.HttpContext.Request.Path;

                                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/messagehub"))
                                {
                                    context.Token = accessToken;
                                }
                                
                                return Task.CompletedTask;
                            }
                        };
                    });

    builder.Services.AddControllers();
    
    builder.Services.AddSignalR()
        .AddJsonProtocol(conf => conf.PayloadSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddSwaggerGen();

    builder.Host.UseSerilog();

    builder.Services.AddMassTransit(x => {

        x.AddConsumer<FreshLoginConsumer>();
    
        x.UsingRabbitMq((context, cfg) => {
            
            cfg.Host("localhost", (ushort) 5673, "/", h => {
                h.Username("guest");
                h.Password("guest");
            });

            cfg.ConfigureEndpoints(context);
        });
    });

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

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.MapHub<LTHub>("/messagehub");

    app.Run();

} catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");

} finally
{
    Log.CloseAndFlush();

}
