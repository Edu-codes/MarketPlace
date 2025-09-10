namespace WebApi_MP.Models
{
    public partial class Role
    {
       public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
