using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Venta
{
    public int Id { get; set; }

    public DateOnly FechaVenta { get; set; }

    public int Total { get; set; }

    public int Doc { get; set; }

    public int? EstadoId { get; set; }

    public virtual ICollection<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();

    public virtual Usuario DocNavigation { get; set; } = null!;

    public virtual Estado? Estado { get; set; }
}
