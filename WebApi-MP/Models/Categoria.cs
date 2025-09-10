using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Categoria
{
    public int Id { get; set; }

    public string NombreCat { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int? EstadoId { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<SubCategoria> SubCategoria { get; set; } = new List<SubCategoria>();
}
