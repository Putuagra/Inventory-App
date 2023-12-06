using API.Models;
using API.Utilities.Handlers;

namespace API.DataTransferObjects.Users;

public class UserDtoUpdateChangePassword
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int? Otp { get; set; }
    public bool IsUsed { get; set; }
    public DateTime? ExpiredTime { get; set; }

    public static implicit operator User(UserDtoUpdateChangePassword userDtoUpdateChangePassword)
    {
        return new()
        {
            Guid = userDtoUpdateChangePassword.Guid,
            Name = userDtoUpdateChangePassword.Name,
            Email = userDtoUpdateChangePassword.Email,
            Password = HashingHandler.Hash(userDtoUpdateChangePassword.Password),
            Otp = userDtoUpdateChangePassword.Otp,
            IsUsed = userDtoUpdateChangePassword.IsUsed,
            ExpiredTime = userDtoUpdateChangePassword.ExpiredTime,
        };
    }

    public static explicit operator UserDtoUpdateChangePassword(User user)
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
