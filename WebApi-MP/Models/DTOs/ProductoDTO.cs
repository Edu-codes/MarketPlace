namespace WebApi_MP.Models.DTOs
{
    public class ProductoDTO
    {

        public int Id { get; set; }

        public string? NombrePro { get; set; }

        public int? Precio { get; set; }

        public int? Cantidad { get; set; }

        public int? IdCat { get; set; }

        public int? UnidadId { get; set; }

        public int? SubcatId { get; set; }

        public string? NombreCat { get; set; }

        public string? UnidadMedida { get; set; }

        public string? NombreSubCat { get; set; }
    }
}
