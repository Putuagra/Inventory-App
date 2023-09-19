using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class CategoryRepository : GeneralRepository<Category>, ICategoryRepository
{
    public CategoryRepository(InventoryDbContext context) : base(context)
    {
    }
}
