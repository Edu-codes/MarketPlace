using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Usuario
{
    public int Doc { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Pass { get; set; } = null!;

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
    
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

}
