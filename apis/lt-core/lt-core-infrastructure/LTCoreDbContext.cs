using lt_core_infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace lt_core_infrastructure;
public class LTCoreDbContext : DbContext
{
    public LTCoreDbContext (DbContextOptions<LTCoreDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LearningPath>()
            .HasKey(l => l.LPId);
    }

    public DbSet<LearningPath>? LearningPaths { get; set; }
}
