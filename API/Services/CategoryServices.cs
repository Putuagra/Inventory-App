using API.Contracts;
using API.DataTransferObjects.Categories;

namespace API.Services;

public class CategoryServices
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryServices(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public IEnumerable<CategoryDtoGet> Get() 
    {
        var categories = _categoryRepository.GetAll().ToList();
        if (!categories.Any()) return Enumerable.Empty<CategoryDtoGet>();
        List<CategoryDtoGet> categoryDtoGets = new List<CategoryDtoGet>();

        foreach (var category in categories)
        {
            categoryDtoGets.Add((CategoryDtoGet)category);
        }

        return categoryDtoGets;
    }

    public CategoryDtoGet? Get(Guid guid)
    {
        var category = _categoryRepository.GetByGuid(guid);
        if (category is null) return null;

        return (CategoryDtoGet)category;
    }

    public CategoryDtoCreate? Create(CategoryDtoCreate categoryDtoCreate)
    {
        var categoryCreated = _categoryRepository.Create(categoryDtoCreate);
        if (categoryCreated is null) return null;
        return (CategoryDtoCreate)categoryCreated;  
    }

    public int Update(CategoryDtoUpdate categoryDtoUpdate)
    {
        var category = _categoryRepository.GetByGuid(categoryDtoUpdate.Guid);
        if (category is null) return -1;

        var categoryUpdated = _categoryRepository.Update(categoryDtoUpdate);
        return categoryUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var category = _categoryRepository.GetByGuid(guid);
        if (category is null) return -1;

        var categoryDeleted = _categoryRepository.Delete(category);
        return categoryDeleted ? 1 : 0;
    }
}
