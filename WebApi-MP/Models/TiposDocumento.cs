using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class TiposDocumento
{
    public int TipoDocumentoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public bool Activo { get; set; }

    public virtual ICollection<DocumentosTiendum> DocumentosTienda { get; set; } = new List<DocumentosTiendum>();
}
