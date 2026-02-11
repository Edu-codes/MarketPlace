using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Tienda
{
    public int IdTienda { get; set; }

    public int TipoDocumento { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? Barrio { get; set; }

    public string? Telefono { get; set; }

    public int Estado { get; set; }

    public DateTime FechaCreacion { get; set; }

    public virtual ICollection<DocumentosTiendum> DocumentosTienda { get; set; } = new List<DocumentosTiendum>();

    public virtual TipoDocumento TipoDocumentoNavigation { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
