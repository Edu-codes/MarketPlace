using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApi_MP.Models;

public partial class MarketPlace2Context : DbContext
{
    public MarketPlace2Context()
    {
    }

    public MarketPlace2Context(DbContextOptions<MarketPlace2Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<DetalleVenta> DetalleVentas { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Favorito> Favoritos { get; set; }

    public virtual DbSet<Foto> Fotos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Promocione> Promociones { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SubCategoria> SubCategorias { get; set; }

    public virtual DbSet<UnidadesMedidum> UnidadesMedida { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<Venta> Ventas { get; set; }

    public virtual DbSet<VentasDetallada> VentasDetalladas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83FF2637565");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreCat)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombreCat");
        });

        modelBuilder.Entity<DetalleVenta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DetalleV__3213E83FBD2FA682");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.PrecioUnitario).HasColumnName("precioUnitario");
            entity.Property(e => e.ProductoRef)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("productoRef");
            entity.Property(e => e.Subtotal).HasColumnName("subtotal");
            entity.Property(e => e.VentaId).HasColumnName("ventaId");

            entity.HasOne(d => d.ProductoRefNavigation).WithMany(p => p.DetalleVenta)
                .HasForeignKey(d => d.ProductoRef)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DetalleVe__produ__52593CB8");

            entity.HasOne(d => d.Venta).WithMany(p => p.DetalleVenta)
                .HasForeignKey(d => d.VentaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DetalleVe__venta__534D60F1");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Estados__3214EC0719B39456");

            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Favorito>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorito__3213E83F6AD3D323");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Doc).HasColumnName("doc");
            entity.Property(e => e.FechaAgregado).HasColumnName("fechaAgregado");
            entity.Property(e => e.Referencia)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("referencia");

            entity.HasOne(d => d.DocNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.Doc)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Favoritos__doc__693CA210");

            entity.HasOne(d => d.ReferenciaNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.Referencia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Favoritos__refer__6A30C649");
        });

        modelBuilder.Entity<Foto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Fotos__3213E83F1219B9A5");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ImageableId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imageable_id");
            entity.Property(e => e.ImageableType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("imageable_type");
            entity.Property(e => e.Ruta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ruta");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Referencia).HasName("PK__Producto__85C4EB32A30EE0D0");

            entity.Property(e => e.Referencia)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("referencia");
            entity.Property(e => e.SubCategoriaId).HasColumnName("subCategoriaId");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.EstadoId)
                .HasDefaultValue(3)
                .HasColumnName("estadoId");
            entity.Property(e => e.NombrePro)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombrePro");
            entity.Property(e => e.Precio).HasColumnName("precio");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.UniMedId).HasColumnName("uniMedId");

            entity.HasOne(d => d.SubCategoria).WithMany(p => p.Productos)
                .HasForeignKey(d => d.SubCategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Productos__subCat__49C3F6B7");

            entity.HasOne(d => d.Estado).WithMany(p => p.Productos)
                .HasForeignKey(d => d.EstadoId)
                .HasConstraintName("FK__Productos__estad__48CFD27E");

            entity.HasOne(d => d.UniMed).WithMany(p => p.Productos)
                .HasForeignKey(d => d.UniMedId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Productos__uniMe__4AB81AF0");
        });

        modelBuilder.Entity<Promocione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Promocio__3213E83FCA392F73");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descuento).HasColumnName("descuento");
            entity.Property(e => e.EstadoId).HasColumnName("estadoId");
            entity.Property(e => e.FechaFin).HasColumnName("fecha_fin");
            entity.Property(e => e.FechaInicio).HasColumnName("fecha_inicio");
            entity.Property(e => e.Referencia)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("referencia");

            entity.HasOne(d => d.Estado).WithMany(p => p.Promociones)
                .HasForeignKey(d => d.EstadoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Promocion__estad__6E01572D");

            entity.HasOne(d => d.ReferenciaNavigation).WithMany(p => p.Promociones)
                .HasForeignKey(d => d.Referencia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Promocion__refer__6D0D32F4");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83FE6FA2C28");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.NombreRol)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombreRol");
        });

        modelBuilder.Entity<SubCategoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SubCateg__3213E83F8AB6F876");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoriaId).HasColumnName("categoriaId");
            entity.Property(e => e.NombreSubCat)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombreSubCat");

            entity.HasOne(d => d.Categoria).WithMany(p => p.SubCategoria)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SubCatego__categ__4316F928");
        });

        modelBuilder.Entity<UnidadesMedidum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Unidades__3213E83F3DB53722");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.NombreUniMed)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombreUniMed");
        });

        modelBuilder.Entity<UserRole>()
            .HasKey(ur => new { ur.Doc, ur.RolId });

        modelBuilder.Entity<UserRole>()
            .ToTable("UserRoles");

        modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.Usuario)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.Doc)
            .HasConstraintName("FK_UserRoles_Usuarios");

        modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.Rol)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RolId)
            .HasConstraintName("FK_UserRoles_Roles");



        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Doc).HasName("PK__Usuarios__D87601412868CB95");

            entity.Property(e => e.Doc)
                .ValueGeneratedNever()
                .HasColumnName("doc");
            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Pass)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pass");
            entity.Property(e => e.Telefono)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<Venta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ventas__3213E83F65B4EFD4");

            entity.ToTable(tb => tb.HasTrigger("DescontarStock"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Doc).HasColumnName("doc");
            entity.Property(e => e.EstadoId)
                .HasDefaultValue(1)
                .HasColumnName("estadoId");
            entity.Property(e => e.FechaVenta).HasColumnName("fechaVenta");
            entity.Property(e => e.Total).HasColumnName("total");

            entity.HasOne(d => d.DocNavigation).WithMany(p => p.Venta)
                .HasForeignKey(d => d.Doc)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Ventas__doc__4F7CD00D");

            entity.HasOne(d => d.Estado).WithMany(p => p.Venta)
                .HasForeignKey(d => d.EstadoId)
                .HasConstraintName("FK__Ventas__estadoId__4E88ABD4");
        });

        modelBuilder.Entity<VentasDetallada>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VentasDetalladas");

            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Cliente)
                .HasMaxLength(101)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaVenta).HasColumnName("fechaVenta");
            entity.Property(e => e.PrecioUnitario).HasColumnName("precioUnitario");
            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Subtotal).HasColumnName("subtotal");
            entity.Property(e => e.Total).HasColumnName("total");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
