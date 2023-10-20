using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class CategoryRepository : GeneralRepository<Category>, ICategoryRepository
{
    public CategoryRepository(InventoryDbContext context) : base(context)
    {
    }

    public Category? CheckDuplicate(string name, Guid guid)
    {
        return Context.Set<Category>().FirstOrDefault(x => x.Name == name && x.SupplierGuid == guid);
    }
}
