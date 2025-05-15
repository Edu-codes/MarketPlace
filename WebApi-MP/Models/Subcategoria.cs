using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Subcategoria
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int IdCat { get; set; }

    public virtual Categoria IdCatNavigation { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
