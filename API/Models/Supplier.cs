using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_m_suppliers")]
public class Supplier : BaseEntity
{
    [Column("name", TypeName = "nvarchar(255)")]
    public string Name { get; set; }
    [Column("email", TypeName = "nvarchar(100)")]
    public string Email { get; set; }
    [Column("address", TypeName = "nvarchar(255)")]
    public string Address { get; set; }
    [Column("phone_number", TypeName = "nvarchar(20)")]
    public string PhoneNumber { get; set; }

    // Cardinility
    public ICollection<Category>? Categories { get; set; }
    public ICollection<Product>? Products { get;}
}
