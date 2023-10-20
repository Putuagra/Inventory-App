using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class ProductRepository : GeneralRepository<Product>, IProductRepository
{
    public ProductRepository(InventoryDbContext context) : base(context)
    {
    }

    public Product? CheckDuplicate(string name, Guid supplierGuid, Guid categoryGuid)
    {
        return Context.Set<Product>().FirstOrDefault(x => x.Name == name && x.SupplierGuid == supplierGuid && x.CategoryGuid == categoryGuid);
    }
}
