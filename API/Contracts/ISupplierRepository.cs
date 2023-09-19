using API.Models;

namespace API.Contracts;

public interface ISupplierRepository : IGeneralRepository<Supplier>
{
    bool IsDuplicateValue(string value);
}
