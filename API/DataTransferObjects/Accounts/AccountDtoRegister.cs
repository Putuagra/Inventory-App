namespace API.DataTransferObjects.Accounts;

public class AccountDtoRegister
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }

    /*public static implicit operator User(AccountDtoRegister userDtoRegister)
    {
        return new()
        {
            Name = userDtoRegister.Name,
            Email = userDtoRegister.Email,
            Password = HashingHandler.Hash(userDtoRegister.Password),
            Otp = 0,
            IsUsed = false
        };
    }

    public static explicit operator AccountDtoRegister(User user)
    {
        return new()
        {
            Name = user.Name,
            Email = user.Email,
            Password = HashingHandler.Hash(user.Password),
        };
    }*/
}
