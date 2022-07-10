using lt_core_persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence;
public class LTCoreDbContext : DbContext
{
    public LTCoreDbContext (DbContextOptions<LTCoreDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LearningPathMetaData>(lp => {
            lp.HasKey(l => l.LPId);
            lp.HasIndex(l => new { l.Title, l.UserId }).IsUnique();
        });

        modelBuilder.Entity<UserActivity>(u => {
            u.HasKey(u => u.Id);
            u.HasIndex(u => u.KcUserId).IsUnique();
        });

        modelBuilder.Entity<Topic>(t => {
            t.HasKey(t => t.TopicId);
            t.HasIndex(t => t.TopicName).IsUnique();
        });

        modelBuilder.Entity<UserTopic>(ut => {
            ut.HasKey(ut => ut.UserTopicId);
            ut.HasIndex(ut => new {ut.TopicId, ut.UserId}).IsUnique();

            ut.HasOne(ut => ut.UserActivity).WithMany(ut => ut.UserTopic).HasForeignKey(ut => ut.UserId).HasPrincipalKey(ut => ut.KcUserId);
            ut.HasOne(ut => ut.Topic).WithMany(ut => ut.UserTopic).HasForeignKey(ut => ut.TopicId);
        });

    }

    public DbSet<LearningPathMetaData>? LearningPathMetaData { get; set; }
    public DbSet<UserActivity>? UserActivity { get; set; }
    public DbSet<Topic>? Topic { get; set; }
    public DbSet<UserTopic>? UserTopic { get; set; }

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
