using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class SupplierRepository : GeneralRepository<Supplier>, ISupplierRepository
{
    public SupplierRepository(InventoryDbContext context) : base(context)
    {
    }
    public bool IsDuplicateValue(string value)
    {
        return Context.Set<Supplier>().FirstOrDefault(s => s.Email.Contains(value) || s.PhoneNumber.Contains(value)) is null;
    }
}
