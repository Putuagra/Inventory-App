using API.Models;

namespace API.Contracts;

public interface IProductRepository : IGeneralRepository<Product>
{
    Product? CheckDuplicate(string name, Guid supplierGuid, Guid categoryGuid);
}
