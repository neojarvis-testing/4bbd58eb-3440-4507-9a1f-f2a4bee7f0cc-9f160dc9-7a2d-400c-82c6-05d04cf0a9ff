using Microsoft.EntityFrameworkCore;

using dotnetapp.Models;

namespace dotnetapp.Data

{

    public class ApplicationDbContext : DbContext

    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<PhysicalTraining> PhysicalTrainings { get; set; }

        public DbSet<PhysicalTrainingRequest> PhysicalTrainingRequests { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<User> Users { get; set; }

    }

}