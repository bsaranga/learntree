using System.Text.Json;
using message_hub.api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR()
    .AddJsonProtocol(conf => conf.PayloadSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase );

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
