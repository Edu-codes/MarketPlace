namespace WebApi_MP.Models.DTOs
{
    public class ProductoDTO
    {

        public string Referencia { get; set; } = null!;

        public string NombrePro { get; set; } = null!;

        public int Precio { get; set; }

        public int Stock { get; set; }

        public string NameSubCategoria { get; set; } = null!;

        public int IdCategoria { get; set; } 

        public string NameCategoria { get; set; } = null!;

        public int SubCategoriaId { get; set; }

        public string NameUniMed { get; set; } = null!;
        
        public int UniMedId { get; set; }

        public string NameEstado { get; set; } = null!; 
        
        public int EstadoId { get; set; }

        public string? Descripcion { get; set; }

    }
}
