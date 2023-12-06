using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_m_users")]
public class User : BaseEntity
{
    [Column("name", TypeName = "nvarchar(255)")]
    public string Name { get; set; }
    [Column("email", TypeName = "nvarchar(255)")]
    public string Email { get; set; }
    [Column("password", TypeName = "nvarchar(255)")]
    public string Password { get; set; }
    [Column("otp")]
    public int? Otp { get; set; }
    [Column("is_used")]
    public bool IsUsed { get; set; }
    [Column("expired_time")]
    public DateTime? ExpiredTime { get; set; }

    // Cardinality
    public ICollection<Transaction>? Transactions { get; set; }
    public ICollection<UserRole>? UserRoles { get; set; }
}
