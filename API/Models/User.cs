using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_m_users")]
public class User : BaseEntity
{
    [Column("name", TypeName = "nvarchar(255)")]
    public string Name { get; set; }
    [Column("email", TypeName = "nvarchar(255)")]
    public string Email { get; set; }

    // Cardinality
    public ICollection<Transaction>? Transactions { get; set; }
    public Account? Account { get; set; }
}
