using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi_MP.Models;
using WebApi_MP.Data;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> entity)
    {
        entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83FE6FA2C28");

        entity.Property(e => e.Id).HasColumnName("id");

        entity.Property(e => e.NombreRol)
            .HasMaxLength(50)
            .IsUnicode(false)
            .HasColumnName("nombreRol");
    }
}
