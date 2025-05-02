using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    // Represents the application's database context, managing entity interactions with the database
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        // Constructor to initialize the DbContext with specific options (e.g., database provider settings)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet representing the PhysicalTraining table in the database
        public DbSet<PhysicalTraining> PhysicalTrainings { get; set; }

        // DbSet representing the PhysicalTrainingRequest table in the database
        public DbSet<PhysicalTrainingRequest> PhysicalTrainingRequests { get; set; }

        // DbSet representing the Feedback table in the database
        public DbSet<Feedback> Feedbacks { get; set; }

        // DbSet representing the Users table in the database
        public DbSet<User> Users { get; set; }
    }
}