namespace WebApi_MP.Models.DTOs
{
    public class TiendaUpdateDTO
    {
        public int IdTienda { get; set; }
        public int TipoDocumento { get; set; }
        public string Nombre { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public string Barrio { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Ciudad { get; set; } = null!;
        public int Estado { get; set; }
    }
}
