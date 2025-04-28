var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(); // Registers the controllers to handle API requests

// Enables API documentation with Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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