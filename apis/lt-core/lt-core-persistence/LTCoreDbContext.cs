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

        modelBuilder.Entity<UserActivity>(u => {
            u.HasKey(u => u.Id);
            u.HasIndex(u => u.KcUserId).IsUnique();
        });

        modelBuilder.Entity<Topic>(t => {
            t.HasKey(t => t.TopicId);
            t.HasIndex(t => t.TopicName).IsUnique();
        });
    }

    public DbSet<LearningPathMetaData>? LearningPathMetaData { get; set; }
    public DbSet<UserActivity>? UserActivity { get; set; }
    public DbSet<Topic>? Topic { get; set; }

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
