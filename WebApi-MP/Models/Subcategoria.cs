using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class SubCategoria
{
    public int Id { get; set; }

    public string NombreSubCat { get; set; } = null!;

    public int CategoriaId { get; set; }

    public int? EstadoId { get; set; }

    public virtual Categoria Categoria { get; set; } = null!;

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
