namespace Client.DataTransferObjects.Users;

public class UserDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
