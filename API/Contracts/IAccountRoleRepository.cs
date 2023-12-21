using API.Models;

namespace API.Contracts;

public interface IAccountRoleRepository : IGeneralRepository<AccountRole>
{
    AccountRole? CheckAccountRole(Guid accountGuid, Guid roleGuid);
    IEnumerable<AccountRole> GetAccountRolesByAccountGuid(Guid guid);
}
