using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoCreate
{
    public string Name { get; set; }
    public string Email { get; set; }

    public static implicit operator User(UserDtoCreate userDtoCreate)
    {
        return new()
        {
            Name = userDtoCreate.Name,
            Email = userDtoCreate.Email
        };
    }

    public static explicit operator UserDtoCreate(User user)
    {
        return new()
        {
            Name = user.Name,
            Email = user.Email,
        };
    }
}
