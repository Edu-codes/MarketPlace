using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi_MP.Models;
using WebApi_MP.Data;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> entity)
    {
        entity.HasKey(ur => new { ur.Doc, ur.RolId });

        entity.HasOne(ur => ur.Usuario)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.Doc);

        entity.HasOne(ur => ur.Rol)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RolId);

        entity.ToTable("UserRoles");
    }
}
