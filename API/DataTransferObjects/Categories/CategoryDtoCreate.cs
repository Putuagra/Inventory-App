using API.Models;

namespace API.DataTransferObjects.Categories;

public class CategoryDtoCreate
{
    public string Name { get; set; }
    public Guid? SupplierGuid { get; set; }

    public static implicit operator Category(CategoryDtoCreate categoryDtoCreate)
    {
        return new()
        {
            Name = categoryDtoCreate.Name,
            SupplierGuid = categoryDtoCreate.SupplierGuid,
        };
    }

    public static explicit operator CategoryDtoCreate(Category category)
    {
        return new()
        {
            Name = category.Name,
            SupplierGuid = category.SupplierGuid,
        };
    }
}
