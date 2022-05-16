using lt_core_infrastructure;
using lt_core_infrastructure.Repositories;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string connectionString = builder.Configuration.GetConnectionString("LTCore");
builder.Services.AddDbContext<LTCoreDbContext>(options => options.UseNpgsql(connectionString, p => p.MigrationsAssembly("lt-core-api")));
builder.Services.AddScoped<ILearningPathMetaDataRepository, LearningPathMetaDataRepository>();

builder.Services.AddMassTransit(x => {
    x.UsingRabbitMq((context, cfg) => {
        cfg.Host("localhost", (ushort) 5673, "/", h => {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddOptions<MassTransitHostOptions>().Configure(options => {
    options.WaitUntilStarted = true;
    // if specified, limits the wait time when starting the bus
    options.StartTimeout = TimeSpan.FromSeconds(10);

    // if specified, limits the wait time when stopping the bus
    options.StopTimeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddControllers();
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

app.UseAuthorization();

app.MapControllers();

app.Run();
