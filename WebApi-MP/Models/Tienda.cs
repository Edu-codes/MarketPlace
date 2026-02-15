using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Tienda
{
    public int IdTienda { get; set; }

    public int TipoDocumento { get; set; }

    public string Nombre { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Barrio { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public int Estado { get; set; }

    public DateTime FechaCreacion { get; set; }

    public virtual TipoDocumento TipoDocumentoNavigation { get; set; } = null!;

    public virtual ICollection<SubCategoria> SubCategoria { get; set; } = new List<SubCategoria>();
}
    