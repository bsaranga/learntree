using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using lt_core_api.Utilities;
using lt_core_api.Utilities.Interfaces;
using lt_core_application.Interfaces;
using lt_core_persistence;
using lt_core_persistence.Consumers;
using lt_core_persistence.Interfaces.Repositories;
using lt_core_persistence.MappingProfiles;
using lt_core_persistence.Queries;
using lt_core_persistence.Queries.Interfaces;
using lt_core_persistence.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.Authority = "https://localhost:8443/realms/LearnTree";
                    options.Audience = "lt-core-api";
                    options.SaveToken = true;
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context => 
                        {
                            var resources = JObject.Parse(context!.Principal!.FindFirst("resource_access")!.Value);
                            var clientResource = resources[context!.Principal!.FindFirst(aud => aud.Value == "lt-core-api")!.Value];
                            var clientRoles = clientResource!["roles"];
                            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;

                            claimsIdentity?.AddClaim(new Claim("UserId", (context.SecurityToken as JwtSecurityToken)!.Claims.Single(c => c.Type == "sub").Value));
                            
                            if (claimsIdentity == null) {
                                throw new Exception("Unauthenticated...");
                            }

                            foreach (var role in clientRoles!)
                            {
                                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role.ToString()));
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

// Add services to the container.
string connectionString = builder.Configuration.GetConnectionString("LTCore");
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient();

// Automapper
builder.Services.AddAutoMapper(typeof(CoreProfile).Assembly);

// Db Contexts
builder.Services.AddDbContext<LTCoreDbContext>(options => options.UseNpgsql(connectionString, p => p.MigrationsAssembly("lt-core-api")));

// Queries
builder.Services.AddScoped<ILookupQuery, LookupQuery>();

// Repositories
builder.Services.AddScoped<ILearningPathMetaDataRepository, LearningPathMetaDataRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Keycloak Services
builder.Services.AddSingleton<KeycloakAdmin>();
builder.Services.AddSingleton<IKeycloakAdmin>(s => s.GetService<KeycloakAdmin>()!);
builder.Services.AddSingleton<IKeycloakAdminInit>(s => s.GetService<KeycloakAdmin>()!);
builder.Services.AddSingleton<IKeycloakEventConsumer, KeycloakEventConsumer>();

builder.Services.AddScoped<IClaimInfo, ClaimInfo>();

builder.Services.AddMassTransit(x => {
    
    x.AddMediator(cfg => {
        cfg.AddConsumer<UserActivityConsumer>();
    });
    
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Services.GetRequiredService<IKeycloakAdminInit>().ScheduledUpdate();
app.Services.GetRequiredService<IKeycloakEventConsumer>();

app.Run();