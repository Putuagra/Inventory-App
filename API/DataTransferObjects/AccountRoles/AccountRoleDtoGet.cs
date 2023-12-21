using API.Models;

namespace API.DataTransferObjects.UserRoles;

public class AccountRoleDtoGet
{
    public Guid Guid { get; set; }
    public Guid AccountGuid { get; set; }
    public Guid RoleGuid { get; set; }

    public static implicit operator AccountRole(AccountRoleDtoGet accountRoleDtoGet)
    {
        return new()
        {
            Guid = accountRoleDtoGet.Guid,
            AccountGuid = accountRoleDtoGet.AccountGuid,
            RoleGuid = accountRoleDtoGet.RoleGuid
        };
    }

    public static explicit operator AccountRoleDtoGet(AccountRole accountRole)
    {
        return new()
        {
            Guid = accountRole.Guid,
            AccountGuid = accountRole.AccountGuid,
            RoleGuid = accountRole.RoleGuid
        };
    }
}
