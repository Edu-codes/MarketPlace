namespace WebApi_MP.Models
{
    public partial class Usuario
    {

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
