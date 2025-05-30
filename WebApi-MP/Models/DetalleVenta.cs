using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class DetalleVenta
{
    public int Id { get; set; }

    public int Subtotal { get; set; }

    public int Cantidad { get; set; }

    public int PrecioUnitario { get; set; }

    public string ProductoRef { get; set; } = null!;

    public int VentaId { get; set; }

    public virtual Producto ProductoRefNavigation { get; set; } = null!;

    public virtual Venta Venta { get; set; } = null!;
}
