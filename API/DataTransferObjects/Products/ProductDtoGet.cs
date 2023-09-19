using API.Models;

namespace API.DataTransferObjects.Products;

public class ProductDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public int Stock { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public Guid CategoryGuid { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Product(ProductDtoGet productDtoGet)
    {
        return new()
        {
            Guid = productDtoGet.Guid,
            Name = productDtoGet.Name,
            Stock = productDtoGet.Stock,
            Price = productDtoGet.Price,
            Description = productDtoGet.Description,
            CategoryGuid = productDtoGet.CategoryGuid,
            SupplierGuid = productDtoGet.SupplierGuid,
        };
    }

    public static explicit operator ProductDtoGet(Product product)
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
