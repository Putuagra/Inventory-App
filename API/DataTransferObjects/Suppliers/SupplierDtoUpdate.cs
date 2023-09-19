using API.Models;

namespace API.DataTransferObjects.Suppliers;

public class SupplierDtoUpdate
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public static implicit operator Supplier(SupplierDtoUpdate supplierDtoUpdate)
    {
        return new()
        {
            Guid = supplierDtoUpdate.Guid,
            Name = supplierDtoUpdate.Name,
            Address = supplierDtoUpdate.Address,
            Email = supplierDtoUpdate.Email,
            PhoneNumber = supplierDtoUpdate.PhoneNumber,
        };
    }

    public static explicit operator SupplierDtoUpdate(Supplier supplier)
    {
        return new()
        {
            Guid = supplier.Guid,
            Name = supplier.Name,
            Address = supplier.Address,
            Email = supplier.Email,
            PhoneNumber = supplier.PhoneNumber,
        };
    }
}
