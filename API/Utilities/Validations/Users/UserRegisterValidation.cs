using API.Contracts;
using API.DataTransferObjects.Accounts;
using FluentValidation;

namespace API.Utilities.Validations.Users;

public class UserRegisterValidation : AbstractValidator<AccountDtoRegister>
{
    private readonly IUserRepository _userRepository;

    public UserRegisterValidation(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        RuleFor(x => x.Name).NotEmpty();

        RuleFor(x => x.Email)
            .NotEmpty()
            .Must(BeUniqueProperty).WithMessage("'Email' already registered")
            .EmailAddress();

        RuleFor(x => x.Password)
           .NotEmpty().WithMessage("Password is required.")
           .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
           .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
           .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
           .Matches("[0-9]").WithMessage("Password must contain at least one digit.")
           .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");

        RuleFor(x => x.ConfirmPassword)
          .NotEmpty()
          .Equal(x => x.Password).WithMessage("Password and Confirm Password do not match.");
    }
    private bool BeUniqueProperty(string property)
    {
        return _userRepository.IsDuplicateValue(property);
    }
}
