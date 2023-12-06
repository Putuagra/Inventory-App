using API.Models;

namespace API.DataTransferObjects.Roles;

public class RoleDtoGet
{
    public Guid Guid { get; set; }
    public string Name { get; set; }

    public static implicit operator Role(RoleDtoGet roleDtoGet)
    {
        return new()
        {
            Guid = roleDtoGet.Guid,
            Name = roleDtoGet.Name
        };
    }

    public static explicit operator RoleDtoGet(Role role)
    {
        return new()
        {
            Guid = role.Guid,
            Name = role.Name
        };
    }
}
