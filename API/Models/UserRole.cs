using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_tr_user_roles")]
public class UserRole : BaseEntity
{
    [Column("user_guid")]
    public Guid UserGuid { get; set; }

    [Column("role_guid")]
    public Guid RoleGuid { get; set; }

    //Cardinality
    public User? User { get; set; }
    public Role? Role { get; set; }
}
