namespace WebApi_MP.Models.DTOs
{
    public class TiendaDTO
    {

        public int IdTienda { get; set; }

        public int TipoDocumento { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Direccion { get; set; } = string.Empty;

        public string Barrio { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Ciudad { get; set; } = string.Empty;

        public int Estado { get; set; }

        public string Codigo { get; set; }

    }
}
