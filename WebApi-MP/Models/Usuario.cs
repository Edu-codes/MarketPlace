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

    public int EstadoId { get; set; }

    public int TipoDocumento { get; set; }

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual TipoDocumento TipoDocumentoNavigation { get; set; } = null!;

    public virtual ICollection<UsuarioTienda> UsuarioTienda { get; set; } = new List<UsuarioTienda>();

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();

    public virtual ICollection<Role> Rols { get; set; } = new List<Role>();
}
