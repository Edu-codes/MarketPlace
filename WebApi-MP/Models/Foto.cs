using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Foto
{
    public int Id { get; set; }

    public string Ruta { get; set; } = null!;

    public string? ImageableId { get; set; }

    public string ImageableType { get; set; } = null!;
}
