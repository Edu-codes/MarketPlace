using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string? NombrePro { get; set; }

    public int? Precio { get; set; }

    public int? Cantidad { get; set; }

    public int? IdCat { get; set; }

    public int? UnidadId { get; set; }

    public int? SubcatId { get; set; }

    public virtual Categoria? IdCatNavigation { get; set; }

    public virtual Subcategoria? Subcat { get; set; }

    public virtual UnidadesMedidum? Unidad { get; set; }

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
}
