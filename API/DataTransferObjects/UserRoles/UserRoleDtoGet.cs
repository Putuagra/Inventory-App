using API.Models;

namespace API.DataTransferObjects.UserRoles;

public class UserRoleDtoGet
{
    public Guid Guid { get; set; }
    public Guid UserGuid { get; set; }
    public Guid RoleGuid { get; set; }

    public static implicit operator UserRole(UserRoleDtoGet userRoleDtoGet)
    {
        return new()
        {
            Guid = userRoleDtoGet.Guid,
            UserGuid = userRoleDtoGet.UserGuid,
            RoleGuid = userRoleDtoGet.RoleGuid
        };
    }

    public static explicit operator UserRoleDtoGet(UserRole userRole)
    {
        return new()
        {
            Guid = userRole.Guid,
            UserGuid = userRole.UserGuid,
            RoleGuid = userRole.RoleGuid
        };
    }
}
