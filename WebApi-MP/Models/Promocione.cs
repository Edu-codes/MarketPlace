using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Promocione
{
    public int Id { get; set; }

    public string Referencia { get; set; } = null!;

    public int Descuento { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FechaFin { get; set; }

    public int EstadoId { get; set; }

    public virtual Estado Estado { get; set; } = null!;

    public virtual Producto ReferenciaNavigation { get; set; } = null!;
}
