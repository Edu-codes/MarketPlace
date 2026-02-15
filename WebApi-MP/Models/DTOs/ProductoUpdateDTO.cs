namespace WebApi_MP.Models.DTOs
{
    public class ProductoUpdateDTO
    {
        public string NombrePro { get; set; }
        public int Precio { get; set; }
        public int Stock { get; set; }
        public int SubCategoriaId { get; set; }
        public int UniMedId { get; set; }
        public int EstadoId { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }
}
