using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Usuario
{
    public int Doc { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Direccion { get; set; }

    public string? Pass { get; set; }

    public string? Telefono { get; set; }

    public int? RolId { get; set; }

    public virtual Role? Rol { get; set; }

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
}
