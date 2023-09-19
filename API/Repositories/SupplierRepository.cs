using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class SupplierRepository : GeneralRepository<Supplier>, ISupplierRepository
{
    public SupplierRepository(InventoryDbContext context) : base(context)
    {
    }
}
