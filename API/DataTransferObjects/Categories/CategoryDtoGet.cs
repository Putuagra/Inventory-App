using API.Models;

namespace API.DataTransferObjects.Categories;

public class CategoryDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Category(CategoryDtoGet categoryDtoGet)
    {
        return new()
        {
            Guid = categoryDtoGet.Guid,
            Name = categoryDtoGet.Name,
            SupplierGuid = categoryDtoGet.SupplierGuid,
        };
    }

    public static explicit operator CategoryDtoGet(Category category)
    {
        return new()
        {
            Guid = category.Guid,
            Name = category.Name,
            SupplierGuid = category.SupplierGuid,
        };
    }
}
