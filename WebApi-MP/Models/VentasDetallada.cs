using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class VentasDetallada
{
    public int VentaId { get; set; }

    public DateOnly FechaVenta { get; set; }

    public string Cliente { get; set; } = null!;

    public string Producto { get; set; } = null!;

    public int Cantidad { get; set; }

    public int PrecioUnitario { get; set; }

    public int Subtotal { get; set; }

    public int Total { get; set; }

    public string Estado { get; set; } = null!;
}
