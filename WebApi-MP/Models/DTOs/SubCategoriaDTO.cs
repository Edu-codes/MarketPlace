namespace WebApi_MP.Models.DTOs
{
    public class SubCategoriaDTO
    {
        public int Id { get; set; }

        public string NombreSubCat { get; set; } = null!;

        public int CategoriaId { get; set; }

        public string NameCategoria { get; set; }

    }
}
