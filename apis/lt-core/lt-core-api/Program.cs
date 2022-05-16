using lt_core_infrastructure;
using lt_core_infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string connectionString = builder.Configuration.GetConnectionString("LTCore");
builder.Services.AddDbContext<LTCoreDbContext>(options => options.UseNpgsql(connectionString, p => p.MigrationsAssembly("lt-core-api")));
builder.Services.AddScoped<ILearningPathMetaDataRepository, LearningPathMetaDataRepository>();

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
