using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Producto
{
    public string Referencia { get; set; } = null!;

    public string NombrePro { get; set; } = null!;

    public int Precio { get; set; }

    public int Stock { get; set; }

    public int SubCategoriaId { get; set; }

    public int UniMedId { get; set; }

    public int? EstadoId { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual ICollection<Promocione> Promociones { get; set; } = new List<Promocione>();

    public virtual SubCategoria SubCategoria { get; set; } = null!;

    public virtual UnidadesMedidum UniMed { get; set; } = null!;
}
