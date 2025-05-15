namespace WebApi_MP.Models.DTOs
{
    public class SubCategoriaDTO
    {
            public int Id { get; set; }

            public string NombreSubCat { get; set; } = null!;

            public string NombreCat { get; set; }

            public int idCat { get; set; }
    }
}
