using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int? Otp { get; set; }
    public bool IsUsed { get; set; }
    public DateTime? ExpiredTime { get; set; }

    public static implicit operator User(UserDtoGet userDtoGet)
    {
        return new()
        {
            Guid = userDtoGet.Guid,
            Name = userDtoGet.Name,
            Email = userDtoGet.Email,
            Password = userDtoGet.Password,
            Otp = userDtoGet.Otp,
            IsUsed = userDtoGet.IsUsed,
            ExpiredTime = userDtoGet.ExpiredTime,
        };
    }

    public static explicit operator UserDtoGet(User user)
    {
        return new()
        {
            Guid = user.Guid,
            Name = user.Name,
            Email = user.Email,
            Password = user.Password,
            Otp = user.Otp,
            IsUsed = user.IsUsed,
            ExpiredTime = user.ExpiredTime,
        };
    }
}
