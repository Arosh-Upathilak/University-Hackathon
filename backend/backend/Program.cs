var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();

// Test endpoint
app.MapGet("/", () => "Backend is running!");

// Map controllers
app.MapControllers();

app.Run();
