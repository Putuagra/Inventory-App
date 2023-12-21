using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public static implicit operator User(UserDtoGet userDtoGet)
    {
        return new()
        {
            Guid = userDtoGet.Guid,
            Name = userDtoGet.Name,
            Email = userDtoGet.Email,
        };
    }

    public static explicit operator UserDtoGet(User user)
    {
        return new()
        {
            Guid = user.Guid,
            Name = user.Name,
            Email = user.Email,
        };
    }
}
