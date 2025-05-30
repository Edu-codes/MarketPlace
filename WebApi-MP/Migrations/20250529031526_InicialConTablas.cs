using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi_MP.Migrations
{
    /// <inheritdoc />
    public partial class InicialConTablas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreCat = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    descripcion = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categori__3213E83FF2637565", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Estados__3214EC0719B39456", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fotos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ruta = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    imageable_id = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    imageable_type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Fotos__3213E83F1219B9A5", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreRol = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Roles__3213E83FE6FA2C28", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UnidadesMedida",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreUniMed = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Unidades__3213E83F3DB53722", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    doc = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    apellido = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    telefono = table.Column<string>(type: "varchar(11)", unicode: false, maxLength: 11, nullable: false),
                    pass = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuarios__D87601412868CB95", x => x.doc);
                });

            migrationBuilder.CreateTable(
                name: "SubCategorias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreSubCat = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    categoriaId = table.Column<int>(type: "int", nullable: false),
                    CategoriaName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SubCateg__3213E83F8AB6F876", x => x.id);
                    table.ForeignKey(
                        name: "FK__SubCatego__categ__4316F928",
                        column: x => x.categoriaId,
                        principalTable: "Categorias",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Doc = table.Column<int>(type: "int", nullable: false),
                    RolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.Doc, x.RolId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles",
                        column: x => x.RolId,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Usuarios",
                        column: x => x.Doc,
                        principalTable: "Usuarios",
                        principalColumn: "doc",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ventas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fechaVenta = table.Column<DateOnly>(type: "date", nullable: false),
                    total = table.Column<int>(type: "int", nullable: false),
                    doc = table.Column<int>(type: "int", nullable: false),
                    estadoId = table.Column<int>(type: "int", nullable: true, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Ventas__3213E83F65B4EFD4", x => x.id);
                    table.ForeignKey(
                        name: "FK__Ventas__doc__4F7CD00D",
                        column: x => x.doc,
                        principalTable: "Usuarios",
                        principalColumn: "doc");
                    table.ForeignKey(
                        name: "FK__Ventas__estadoId__4E88ABD4",
                        column: x => x.estadoId,
                        principalTable: "Estados",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    referencia = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    nombrePro = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    precio = table.Column<int>(type: "int", nullable: false),
                    stock = table.Column<int>(type: "int", nullable: false),
                    subCategoriaId = table.Column<int>(type: "int", nullable: false),
                    uniMedId = table.Column<int>(type: "int", nullable: false),
                    estadoId = table.Column<int>(type: "int", nullable: true, defaultValue: 3),
                    descripcion = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    CategoriaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Producto__85C4EB32A30EE0D0", x => x.referencia);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_CategoriaId",
                        column: x => x.CategoriaId,
                        principalTable: "Categorias",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Productos__estad__48CFD27E",
                        column: x => x.estadoId,
                        principalTable: "Estados",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Productos__subCat__49C3F6B7",
                        column: x => x.subCategoriaId,
                        principalTable: "SubCategorias",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Productos__uniMe__4AB81AF0",
                        column: x => x.uniMedId,
                        principalTable: "UnidadesMedida",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subtotal = table.Column<int>(type: "int", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    precioUnitario = table.Column<int>(type: "int", nullable: false),
                    productoRef = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    ventaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DetalleV__3213E83FBD2FA682", x => x.id);
                    table.ForeignKey(
                        name: "FK__DetalleVe__produ__52593CB8",
                        column: x => x.productoRef,
                        principalTable: "Productos",
                        principalColumn: "referencia");
                    table.ForeignKey(
                        name: "FK__DetalleVe__venta__534D60F1",
                        column: x => x.ventaId,
                        principalTable: "Ventas",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    doc = table.Column<int>(type: "int", nullable: false),
                    referencia = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    fechaAgregado = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Favorito__3213E83F6AD3D323", x => x.id);
                    table.ForeignKey(
                        name: "FK__Favoritos__doc__693CA210",
                        column: x => x.doc,
                        principalTable: "Usuarios",
                        principalColumn: "doc");
                    table.ForeignKey(
                        name: "FK__Favoritos__refer__6A30C649",
                        column: x => x.referencia,
                        principalTable: "Productos",
                        principalColumn: "referencia");
                });

            migrationBuilder.CreateTable(
                name: "Promociones",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    referencia = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    descuento = table.Column<int>(type: "int", nullable: false),
                    fecha_inicio = table.Column<DateOnly>(type: "date", nullable: false),
                    fecha_fin = table.Column<DateOnly>(type: "date", nullable: false),
                    estadoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Promocio__3213E83FCA392F73", x => x.id);
                    table.ForeignKey(
                        name: "FK__Promocion__estad__6E01572D",
                        column: x => x.estadoId,
                        principalTable: "Estados",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Promocion__refer__6D0D32F4",
                        column: x => x.referencia,
                        principalTable: "Productos",
                        principalColumn: "referencia");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentas_productoRef",
                table: "DetalleVentas",
                column: "productoRef");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentas_ventaId",
                table: "DetalleVentas",
                column: "ventaId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_doc",
                table: "Favoritos",
                column: "doc");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_referencia",
                table: "Favoritos",
                column: "referencia");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_CategoriaId",
                table: "Productos",
                column: "CategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_estadoId",
                table: "Productos",
                column: "estadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_subCategoriaId",
                table: "Productos",
                column: "subCategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_uniMedId",
                table: "Productos",
                column: "uniMedId");

            migrationBuilder.CreateIndex(
                name: "IX_Promociones_estadoId",
                table: "Promociones",
                column: "estadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Promociones_referencia",
                table: "Promociones",
                column: "referencia");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategorias_categoriaId",
                table: "SubCategorias",
                column: "categoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RolId",
                table: "UserRoles",
                column: "RolId");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_doc",
                table: "Ventas",
                column: "doc");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_estadoId",
                table: "Ventas",
                column: "estadoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleVentas");

            migrationBuilder.DropTable(
                name: "Favoritos");

            migrationBuilder.DropTable(
                name: "Fotos");

            migrationBuilder.DropTable(
                name: "Promociones");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Ventas");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropTable(
                name: "SubCategorias");

            migrationBuilder.DropTable(
                name: "UnidadesMedida");

            migrationBuilder.DropTable(
                name: "Categorias");
        }
    }
}
