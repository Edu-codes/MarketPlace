﻿using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Estado
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Categoria> Categoria { get; set; } = new List<Categoria>();

    public virtual ICollection<Foto> Fotos { get; set; } = new List<Foto>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();

    public virtual ICollection<Promocione> Promociones { get; set; } = new List<Promocione>();

    public virtual ICollection<SubCategoria> SubCategoria { get; set; } = new List<SubCategoria>();

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
}
