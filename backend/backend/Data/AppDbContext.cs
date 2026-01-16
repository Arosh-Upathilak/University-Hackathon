using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<CompetitionProblem> CompetitionProblems { get; set; }
        public DbSet<QuestionCodeSubmission> QuestionSubmitions { get; set; }
        public DbSet<TestCase> TestCases { get; set; }
        public DbSet<CompetitionRegistration> CompetitionRegistrations { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Competition>()
        .HasOne(c => c.CreatedByUser)
        .WithMany()
        .HasForeignKey(c => c.CreatedByUserId)
        .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CompetitionProblem>()
                .HasKey(p => new { p.CompetitionId, p.CompetitionProblemId });

            builder.Entity<CompetitionProblem>()
                .HasOne(p => p.Competition)
                .WithMany(c => c.Problems)
                .HasForeignKey(p => p.CompetitionId);

            builder.Entity<TestCase>()
                .HasOne(t => t.CompetitionProblem)
                .WithMany(p => p.TestCases)
                .HasForeignKey(t => new { t.CompetitionId, t.CompetitionProblemId });

            builder.Entity<QuestionCodeSubmission>()
                .HasOne(q => q.CompetitionProblem)
                .WithMany()
                .HasForeignKey(q => new { q.CompetitionId, q.CompetitionProblemId });

            builder.Entity<QuestionCodeSubmission>()
                .HasOne(q => q.Student)
                .WithMany()
                .HasForeignKey(q => q.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CompetitionRegistration>()
                .HasIndex(r => new { r.StudentId, r.CompetitionId })
                .IsUnique();
        }

    }
}