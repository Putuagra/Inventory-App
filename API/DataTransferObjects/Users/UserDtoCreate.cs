using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoCreate
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public static implicit operator User(UserDtoCreate userDtoCreate)
    {
        return new()
        {
            Name = userDtoCreate.Name,
            Email = userDtoCreate.Email,
            Password = userDtoCreate.Password
        };
    }

    public static explicit operator UserDtoCreate(User user)
    {
        return new()
        {
            Name = user.Name,
            Email = user.Email,
            Password = user.Password,
        };
    }
}
