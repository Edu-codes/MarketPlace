using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Categoria
{
    public int Id { get; set; }

    public string NombreCat { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<SubCategoria> SubCategoria { get; set; } = new List<SubCategoria>();
}
