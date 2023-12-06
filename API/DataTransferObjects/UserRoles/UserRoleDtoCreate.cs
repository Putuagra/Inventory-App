using API.Models;

namespace API.DataTransferObjects.UserRoles;

public class UserRoleDtoCreate
{
    public Guid UserGuid { get; set; }
    public Guid RoleGuid { get; set; }

    public static implicit operator UserRole(UserRoleDtoCreate userRoleDtoCreate)
    {
        return new()
        {
            UserGuid = userRoleDtoCreate.UserGuid,
            RoleGuid = userRoleDtoCreate.RoleGuid
        };
    }

    public static explicit operator UserRoleDtoCreate(UserRole userRole)
    {
        return new()
        {
            UserGuid = userRole.UserGuid,
            RoleGuid = userRole.RoleGuid
        };
    }
}
