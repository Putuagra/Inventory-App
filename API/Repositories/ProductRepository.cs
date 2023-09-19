using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class ProductRepository : GeneralRepository<Product>, IProductRepository
{
    public ProductRepository(InventoryDbContext context) : base(context)
    {
    }
}
