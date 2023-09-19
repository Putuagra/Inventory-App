using API.Models;

namespace API.DataTransferObjects.Products;

public class ProductDtoUpdate
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public int Stock { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public Guid CategoryGuid { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Product(ProductDtoUpdate productDtoUpdate)
    {
        return new()
        {
            Guid = productDtoUpdate.Guid,
            Name = productDtoUpdate.Name,
            Stock = productDtoUpdate.Stock,
            Price = productDtoUpdate.Price,
            Description = productDtoUpdate.Description,
            CategoryGuid = productDtoUpdate.CategoryGuid,
            SupplierGuid = productDtoUpdate.SupplierGuid,
            ModifiedDate = DateTime.UtcNow,
        };
    }

    public static explicit operator ProductDtoUpdate(Product product)
    {
        return new()
        {
            Guid = product.Guid,
            Name = product.Name,
            Stock = product.Stock,
            Price = product.Price,
            Description = product.Description,
            CategoryGuid = product.CategoryGuid,
            SupplierGuid = product.SupplierGuid,
        };
    }
}
