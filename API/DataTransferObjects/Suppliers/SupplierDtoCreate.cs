using API.Models;

namespace API.DataTransferObjects.Suppliers;

public class SupplierDtoCreate
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public static implicit operator Supplier(SupplierDtoCreate supplierDtoCreate)
    {
        return new()
        {
            Name = supplierDtoCreate.Name,
            Address = supplierDtoCreate.Address,
            Email = supplierDtoCreate.Email,
            PhoneNumber = supplierDtoCreate.PhoneNumber,
        };
    }

    public static explicit operator SupplierDtoCreate(Supplier supplier)
    {
        return new()
        {
            Name = supplier.Name,
            Address = supplier.Address,
            Email = supplier.Email,
            PhoneNumber = supplier.PhoneNumber,
        };
    }
}
