namespace WebApi_MP.Models.DTOs
{
    public class TiendaDTO
    {

        public int IdTienda { get; set; }

        public int TipoDocumento { get; set; }

        public string Nombre { get; set; } = null!;

        public string? Direccion { get; set; }

        public string? Barrio { get; set; }

        public string? Telefono { get; set; }

        public int Estado { get; set; }

        public string? Codigo { get; set; }

    }
}
