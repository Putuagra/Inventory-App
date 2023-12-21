using API.Models;

namespace API.DataTransferObjects.UserRoles;

public class AccountRoleDtoCreate
{
    public Guid AccountGuid { get; set; }
    public Guid RoleGuid { get; set; }

    public static implicit operator AccountRole(AccountRoleDtoCreate accountRoleDtoCreate)
    {
        return new()
        {
            AccountGuid = accountRoleDtoCreate.AccountGuid,
            RoleGuid = accountRoleDtoCreate.RoleGuid
        };
    }

    public static explicit operator AccountRoleDtoCreate(AccountRole accountRole)
    {
        return new()
        {
            AccountGuid = accountRole.AccountGuid,
            RoleGuid = accountRole.RoleGuid
        };
    }
}
