using lt_core_persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence;
public class LTCoreDbContext : DbContext
{
    public LTCoreDbContext (DbContextOptions<LTCoreDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LearningPathMetaData>()
            .HasKey(l => l.LPId);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);
    }

    public DbSet<LearningPathMetaData>? LearningPathMetaData { get; set; }
    public DbSet<User>? User { get; set; }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseEntity && (
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).CreatedOn = DateTime.UtcNow;
            }

            if (entityEntry.State == EntityState.Modified)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedOn = DateTime.UtcNow;
            }
        }

        return await base.SaveChangesAsync(true, cancellationToken).ConfigureAwait(false);
    }
}
