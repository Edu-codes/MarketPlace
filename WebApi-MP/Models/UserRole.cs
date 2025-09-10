namespace WebApi_MP.Models
{
    public partial class UserRole
    {
        public int Doc { get; set; }
        public int RolId { get; set; }

        public virtual Usuario Usuario { get; set; } = null!;
        public virtual Role Rol { get; set; } = null!;
    }
}
