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
        string lowerValue = value.ToLower();
        return Context.Set<Supplier>().FirstOrDefault(s => s.Email.ToLower() == lowerValue || s.PhoneNumber.ToLower() == lowerValue || s.Name.ToLower() == lowerValue) is null;
    }

    public Supplier? GetSupplierByEmail(string email)
    {
        return Context.Set<Supplier>().FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
    }

    public Supplier? GetSupplierByPhone(string phone)
    {
        return Context.Set<Supplier>().FirstOrDefault(u => u.PhoneNumber == phone);
    }

    public Supplier? GetSupplierByName(string name)
    {
        return Context.Set<Supplier>().FirstOrDefault(u => u.Name == name);
    }
}
