using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Categoria
{
    public int Id { get; set; }

    public string? NombreCat { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<Subcategoria> Subcategoria { get; set; } = new List<Subcategoria>();
}
