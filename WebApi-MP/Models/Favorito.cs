using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Favorito
{
    public int Id { get; set; }

    public int Doc { get; set; }

    public string Referencia { get; set; } = null!;

    public DateOnly FechaAgregado { get; set; }

    public virtual Usuario DocNavigation { get; set; } = null!;

    public virtual Producto ReferenciaNavigation { get; set; } = null!;
}
