using API.Models;

namespace API.Contracts;

public interface ISupplierRepository : IGeneralRepository<Supplier>
{
    bool IsDuplicateValue(string value);
    Supplier? GetSupplierByEmail(string email);
    Supplier? GetSupplierByPhone(string number);
    Supplier? GetSupplierByName(string name);
}
