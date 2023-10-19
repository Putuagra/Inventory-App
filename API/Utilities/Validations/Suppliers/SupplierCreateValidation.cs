using API.Contracts;
using API.DataTransferObjects.Suppliers;
using API.DataTransferObjects.Users;
using API.Repositories;
using FluentValidation;

namespace API.Utilities.Validations.Suppliers;

public class SupplierCreateValidation : AbstractValidator<SupplierDtoCreate>
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierCreateValidation(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;

        RuleFor(x => x.Name)
            .NotEmpty()
            .Must(BeUniqueProperty).WithMessage("'Name' already registered");

        RuleFor(x => x.Email)
            .NotEmpty()
            .Must(BeUniqueProperty).WithMessage("'Email' already registered")
            .EmailAddress();

        RuleFor(x => x.Address)
            .NotEmpty();

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .Must(BeUniqueProperty).WithMessage("'Phone Number' already registered")
            .Matches(@"^\+[1-9]\d{1,20}$");
    }
    private bool BeUniqueProperty(string property)
    {
        return _supplierRepository.IsDuplicateValue(property);
    }
}
