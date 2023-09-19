using API.Contracts;
using API.DataTransferObjects.Suppliers;

namespace API.Services;

public class SupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }

    public IEnumerable<SupplierDtoGet> Get()
    {
        var suppliers = _supplierRepository.GetAll();
        if (!suppliers.Any()) return Enumerable.Empty<SupplierDtoGet>();
        List<SupplierDtoGet> supplierDtoGets = new List<SupplierDtoGet>();
        foreach (var supplier in suppliers)
        {
            supplierDtoGets.Add((SupplierDtoGet)supplier);
        }

        return supplierDtoGets;
    }

    public SupplierDtoGet? Get(Guid guid)
    {
        var supplier = _supplierRepository.GetByGuid(guid);
        if (supplier is null) return null;

        return (SupplierDtoGet)supplier;
    }

    public SupplierDtoCreate? Create(SupplierDtoCreate supplierDtoCreate)
    {
        var supplierCreated = _supplierRepository.Create(supplierDtoCreate);
        if (supplierCreated is null) return null;

        return (SupplierDtoCreate)supplierCreated;
    }

    public int Update(SupplierDtoUpdate supplierDtoUpdate)
    {
        var supplier = _supplierRepository.GetByGuid(supplierDtoUpdate.Guid);
        if (supplier is null) return -1;

        var supplierUpdated = _supplierRepository.Update(supplierDtoUpdate);
        return supplierUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var supplier = _supplierRepository.GetByGuid(guid);
        if (supplier is null) return -1;

        var supplierDeleted = _supplierRepository.Delete(supplier);
        return supplierDeleted ? 1 : 0;
    }
}
