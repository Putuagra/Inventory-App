using API.Models;

namespace API.DataTransferObjects.Categories;

public class CategoryDtoUpdate
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Category(CategoryDtoUpdate categoryDtoUpdate)
    {
        return new()
        {
            Guid = categoryDtoUpdate.Guid,
            Name = categoryDtoUpdate.Name,
            SupplierGuid = categoryDtoUpdate.SupplierGuid,
        };
    }

    public static explicit operator CategoryDtoUpdate(Category category)
    {
        return new()
        {
            Guid = category.Guid,
            Name = category.Name,
            SupplierGuid = category.SupplierGuid,
        };
    }

}
