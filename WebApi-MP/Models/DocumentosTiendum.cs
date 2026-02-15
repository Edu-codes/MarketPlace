using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class DocumentosTiendum
{
    public int DocumentoId { get; set; }

    public int TiendaId { get; set; }

    public int TipoDocumentoId { get; set; }

    public string ArchivoUrl { get; set; } = null!;

    public DateTime FechaSubida { get; set; }
}
