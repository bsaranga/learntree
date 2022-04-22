using learntree_graph.infrastructure;
using learntree_graph.infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;

if (args.Any() && args[0] == "test") {
    
    var dict = new Dictionary<string, object>() {
        {"Key1", DateTime.Now},
        {"Key2", 3.14159m},
        {"Key3", "foobar"},
    };

    foreach (var d in dict)
    {
        Console.WriteLine(d.Value.GetType());
    }

    return;
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.Authority = "https://localhost:8443/realms/LearnTree";
                    options.Audience = "graph-backend";
                });

// Add services to the container.
builder.Services.AddScoped<IAuraDbConnection, AuraDbConnection>();
builder.Services.AddScoped<IGraphCore, GraphCore>();

builder.Services.AddControllers();
builder.Services.AddHealthChecks();
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
                  .AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
