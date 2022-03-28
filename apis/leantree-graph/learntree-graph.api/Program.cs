using learntree_graph.infrastructure;
using learntree_graph.infrastructure.Repositories;

if (args.Any() && args[0] == "test") {
    Console.WriteLine("DETOUR...");

    var foo = "foo, ";
    Console.WriteLine(foo.Substring(0, foo.Length - 2));

    return;
}

var builder = WebApplication.CreateBuilder(args);

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

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
