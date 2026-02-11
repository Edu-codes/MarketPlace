using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class TipoDocumento
{
    public int IdTipoDocumento { get; set; }

    public string Nombre { get; set; } = null!;

    public string Codigo { get; set; } = null!;

    public virtual ICollection<Tienda> Tienda { get; set; } = new List<Tienda>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
