using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(); // Registers the controllers to handle API requests

// Enables API documentation with Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configures the database context with SQL Server using the connection string from appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("conString")));

// Registers application services with dependency injection for scoped lifetime
builder.Services.AddScoped<FeedbackService>(); // Service for handling feedback operations
builder.Services.AddScoped<PhysicalTrainingService>(); // Service for managing physical training sessions
builder.Services.AddScoped<PhysicalTrainingRequestService>(); // Service for handling training requests

var app = builder.Build();

// Configure the HTTP request pipeline.

// Enables Swagger UI and API documentation only in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enforces HTTPS for secure communication
app.UseHttpsRedirection();

// Enables authorization middleware to handle authentication and authorization logic
app.UseAuthorization();

// Maps controllers to endpoints so the API routes work correctly
app.MapControllers();

// Runs the application
app.Run();