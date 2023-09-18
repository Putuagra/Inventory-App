using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_tr_transactions")]

public class Transaction : BaseEntity
{
    [Column("user_guid")]
    public Guid UserGuid { get; set; }
    [Column("product_guid")]
    public Guid ProductGuid { get; set; }
    [Column("quantity")]
    public int Quantity { get; set; }

    // Cardinality
    public User? User { get; set; }
    public Product? Product { get; set; }
}
