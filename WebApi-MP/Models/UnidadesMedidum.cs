using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class UnidadesMedidum
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
