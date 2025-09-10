namespace WebApi_MP.Models.DTOs
{
    public class FotoDTO
    {

        public int Id { get; set; }

        public string Ruta { get; set; } = null!;

        public string? ImageableId { get; set; }

        public string ImageableType { get; set; } = null!;

        public int? EstadoId { get; set; }
    }
}
