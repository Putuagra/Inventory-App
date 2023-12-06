using API.Models;
using API.Utilities.Handlers;

namespace API.DataTransferObjects.Users;

public class UserDtoChangePassword
{
    public string Email { get; set; }
    public int Otp { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmNewPassword { get; set; }

    /*public static implicit operator User(UserDtoChangePassword userDtoChangePassword)
    {
        return new()
        {
            Email = userDtoChangePassword.Email,
            Otp = userDtoChangePassword.Otp,
            Password = HashingHandler.Hash(userDtoChangePassword.NewPassword),
            IsUsed = true,
        };
    }

    public static explicit operator UserDtoChangePassword(User user)
    {
        return new()
        {
            Email = user.Email,
            Otp = (int)user.Otp,
            NewPassword = HashingHandler.Hash(user.Password)
        };
    }*/
}
