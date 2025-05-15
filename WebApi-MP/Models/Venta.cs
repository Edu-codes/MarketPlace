using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Venta
{
    public int Id { get; set; }

    public int? IdProducto { get; set; }

    public int? IdUsuario { get; set; }

    public DateOnly? Fecha { get; set; }

    public virtual Producto? IdProductoNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
