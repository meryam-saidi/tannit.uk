using Duende.IdentityServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using Tannit.AuthServer.Config;
using Tannit.AuthServer.Repositories;
using Tannit.AuthServer.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== CONFIGURATION DE LA CONNEXION SQL (Dapper)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddScoped<IDbConnection>(_ =>
{
    var connection = new SqlConnection(connectionString);
    connection.Open(); // Connexion ouverte pour chaque requête HTTP
    return connection;
});

// ===== DEPENDENCY INJECTION : Services & Repos
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IEmailVerificationRepository, EmailVerificationRepository>();
builder.Services.AddHostedService<ExpiredCodeCleanupService>();

// ===== CONTROLLERS & SWAGGER
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===== AUTHENTICATION
/*
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]!);
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://localhost:7111"; // IdentityServer
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false
        };
    });
*/
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });


/*
    .AddGoogle("Google", options => // Ajouter Google ici
    {
        options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
        //options.CallbackPath = "/signin-google";
    });
*/
// ===== IDENTITY SERVER (Duende)
builder.Services.AddIdentityServer(options =>
{
    options.Events.RaiseErrorEvents = true;
    options.Events.RaiseFailureEvents = true;
    options.Events.RaiseInformationEvents = true;
    options.Events.RaiseSuccessEvents = true;

    // Active explicitement le support du flow "password"
    options.InputLengthRestrictions.Password = 128;
})
.AddInMemoryClients(IdentityConfig.Clients)
.AddInMemoryApiScopes(IdentityConfig.ApiScopes)
.AddInMemoryIdentityResources(IdentityConfig.IdentityResources)
.AddDeveloperSigningCredential(); // Ne pas utiliser en prod (remplacer par une clé persistante)

// ===== Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithExposedHeaders("Authorization");
    });
});

var app = builder.Build();

// ===== MIDDLEWARE PIPELINE
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseIdentityServer(); // Nécessaire pour IdentityServer
app.UseAuthentication(); // Nécessaire pour JWT & Google OAuth
app.UseAuthorization();

app.MapDefaultControllerRoute(); // mappe automatiquement les controllers
app.MapControllers();

app.Run();
