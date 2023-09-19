using API.Models;
using API.Utilities.Handlers;

namespace API.DataTransferObjects.Users;

public class UserDtoRegister
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }

    public static implicit operator User(UserDtoRegister userDtoRegister)
    {
        return new()
        {
            Name = userDtoRegister.Name,
            Email = userDtoRegister.Email,
            Password = HashingHandler.Hash(userDtoRegister.Password),
        };
    }

    public static explicit operator UserDtoRegister(User user)
    {
        return new()
        {
            Name = user.Name,
            Email = user.Email,
            Password = HashingHandler.Hash(user.Password),
        };
    }
}
