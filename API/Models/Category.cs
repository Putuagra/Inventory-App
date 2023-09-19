using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_m_categories")]

public class Category : BaseEntity
{
    [Column("name", TypeName = "nvarchar(255)")]
    public string Name { get; set; }
    [Column("supplier_guid")]
    public Guid? SupplierGuid { get; set; }

    // Cardinility
    public Supplier? Supplier { get; set; }
    public ICollection<Product>? Products { get; set; }
}
