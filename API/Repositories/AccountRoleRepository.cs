using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class AccountRoleRepository : GeneralRepository<AccountRole>, IAccountRoleRepository
{
    public AccountRoleRepository(InventoryDbContext context) : base(context)
    {
    }

    public AccountRole? CheckAccountRole(Guid accountGuid, Guid roleGuid)
    {
        return Context.Set<AccountRole>().FirstOrDefault(x => x.AccountGuid == accountGuid && x.RoleGuid == roleGuid);
    }

    public IEnumerable<AccountRole> GetAccountRolesByAccountGuid(Guid guid)
    {
        return Context.Set<AccountRole>().Where(accountRole => accountRole.AccountGuid == guid);
    }
}
