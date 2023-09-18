using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_m_products")]
public class Product : BaseEntity
{
    [Column("name", TypeName = "nvarchar(255)")]
    public string Name { get; set; }
    [Column("stock")]
    public int Stock { get; set; }
    [Column("price")]
    public int Price { get; set; }
    [Column("description", TypeName = "nvarchar(255)")]
    public string Description { get; set; }
    [Column("category_guid")]
    public Guid CategoryGuid { get; set; }
    [Column("supplier_guid")]
    public Guid SupplierGuid { get; set; }

    // Cardinality
    public Supplier? Supplier { get; set; }
    public ICollection<Transaction>? Transactions { get; set;}
    public Category? Category { get; set; }

}
