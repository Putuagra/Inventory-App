using API.Models;

namespace API.DataTransferObjects.Suppliers;

public class SupplierDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public static implicit operator Supplier(SupplierDtoGet supplierDtoGet)
    {
        return new()
        {
            Guid = supplierDtoGet.Guid,
            Name = supplierDtoGet.Name,
            Address = supplierDtoGet.Address,
            Email = supplierDtoGet.Email,
            PhoneNumber = supplierDtoGet.PhoneNumber,
        };
    }

    public static explicit operator SupplierDtoGet(Supplier supplier)
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
