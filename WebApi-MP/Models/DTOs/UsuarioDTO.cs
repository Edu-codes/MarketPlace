namespace WebApi_MP.Models.DTOs
{
    public class UsuarioDTO
    {
        public int Doc { get; set; }

        public string Nombre { get; set; } = null!;

        public string Apellido { get; set; } = null!;

        public string Direccion { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Telefono { get; set; } = null!;

        public string Pass { get; set; } = null!;

        public List<string> Roles { get; set; } = new List<string>();


    }
}
