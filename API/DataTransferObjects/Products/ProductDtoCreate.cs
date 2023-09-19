using API.Models;

namespace API.DataTransferObjects.Products;

public class ProductDtoCreate
{
    public string Name { get; set; }
    public int Stock { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public Guid CategoryGuid { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Product(ProductDtoCreate productDtoCreate)
    {
        return new()
        {
            Name = productDtoCreate.Name,
            Stock = productDtoCreate.Stock,
            Price = productDtoCreate.Price,
            Description = productDtoCreate.Description,
            CategoryGuid = productDtoCreate.CategoryGuid,
            SupplierGuid = productDtoCreate.SupplierGuid,
            CreatedDate = DateTime.UtcNow
        };
    }

    public static explicit operator ProductDtoCreate(Product product)
    {
        return new()
        {
            Name = product.Name,
            Stock = product.Stock,
            Price = product.Price,
            Description = product.Description,
            CategoryGuid = product.CategoryGuid,
            SupplierGuid = product.SupplierGuid,
        };
    }
}
