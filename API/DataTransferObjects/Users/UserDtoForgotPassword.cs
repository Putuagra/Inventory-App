using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoForgotPassword
{
    public string Email { get; set; }

    /*public static implicit operator User(UserDtoForgotPassword userDtoForgotPassword)
    {
        return new()
        {
            Guid = userDtoForgotPassword.Guid,
            Email = userDtoForgotPassword.Email,
            Otp = new Random().Next(111111, 999999),
            ExpiredTime = DateTime.Now.AddMinutes(5),
            IsUsed = false,
        };
    }

    public static explicit operator UserDtoForgotPassword(User user)
    {
        return new()
        {
            Email = user.Email,
        };
    }*/
}
