using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ltgraph.domain.Interfaces;
using ltgraph.infrastructure;
using ltgraph.infrastructure.Repositories;
using ltgraph.Utilities;
using ltgraph.Utilities.ModelBinders.Providers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json.Linq;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration, "Serilog")
            .CreateLogger();

try
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.Authority = "https://localhost:8443/realms/LearnTree";
                    options.Audience = "graph-api";
                    options.SaveToken = true;
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = err => 
                        {
                            var failedContext = err;
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context => 
                        {
                            var resources = JObject.Parse(context!.Principal!.FindFirst("resource_access")!.Value);
                            var clientResource = resources[context!.Principal!.FindFirst("aud")!.Value];
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

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddHttpClient();

    // Add services to the container.
    builder.Services.AddSingleton<IAuraDbConnection, AuraDbConnection>();
    builder.Services.AddScoped<IGraphCore, GraphCore>();
    builder.Services.AddScoped<ILPathRepository, LPathRepository>();
    builder.Services.AddScoped<IClaimInfo, ClaimInfo>();

    builder.Services.AddControllers(options => {
        options.ModelBinderProviders.Insert(0, new GraphEventBinderProvider());
    });
    
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

    Log.Information("Starting LTGraphAPI");
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");
} finally 
{
    Log.CloseAndFlush();
}