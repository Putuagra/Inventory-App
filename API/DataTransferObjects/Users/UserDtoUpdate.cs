using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoUpdate
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public static implicit operator User(UserDtoUpdate userDtoUpdate)
    {
        return new()
        {
            Guid = userDtoUpdate.Guid,
            Name = userDtoUpdate.Name,
            Email = userDtoUpdate.Email,
        };
    }

    public static explicit operator UserDtoUpdate(User user)
    {
        return new()
        {
            Guid = user.Guid,
            Name = user.Name,
            Email = user.Email,
        };
    }
}
