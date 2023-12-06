using API.Models;

namespace API.DataTransferObjects.UserRoles;

public class UserRoleDtoUpdate
{
    public Guid Guid { get; set; }
    public Guid UserGuid { get; set; }
    public Guid RoleGuid { get; set; }

    public static implicit operator UserRole(UserRoleDtoUpdate userRoleDtoUpdate)
    {
        return new()
        {
            Guid = userRoleDtoUpdate.Guid,
            UserGuid = userRoleDtoUpdate.UserGuid,
            RoleGuid = userRoleDtoUpdate.RoleGuid
        };
    }

    public static explicit operator UserRoleDtoUpdate(UserRole userRole)
    {
        return new()
        {
            Guid = userRole.Guid,
            UserGuid = userRole.UserGuid,
            RoleGuid = userRole.RoleGuid
        };
    }
}
