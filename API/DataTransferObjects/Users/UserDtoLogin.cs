using API.Models;

namespace API.DataTransferObjects.Users;

public class UserDtoLogin
{
    public string Email { get; set; }
    public string Password { get; set; }

    public static implicit operator User(UserDtoLogin userDtoLogin)
    {
        return new()
        {
            Email = userDtoLogin.Email,
            Password = userDtoLogin.Password
        };
    }

    public static explicit operator UserDtoLogin(User user)
    {
        return new()
        {
            Email = user.Email,
            Password = user.Password
        };
    }
}
