using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class UsuarioTienda
{
    public int UsuarioId { get; set; }

    public int TiendaId { get; set; }

    public virtual Usuario Usuario { get; set; } = null!;
}
