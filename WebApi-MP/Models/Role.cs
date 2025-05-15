using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Role
{
    public int Id { get; set; }

    public string? NombreRol { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
