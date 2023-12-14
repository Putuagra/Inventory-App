using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class UserRoleRepository : GeneralRepository<UserRole>, IUserRoleRepository
{
    public UserRoleRepository(InventoryDbContext context) : base(context)
    {
    }

    public UserRole? CheckUserRole(Guid userGuid, Guid roleGuid)
    {
        return Context.Set<UserRole>().FirstOrDefault(x => x.UserGuid == userGuid && x.RoleGuid == roleGuid);
    }
}
