using API.Models;

namespace API.Contracts;

public interface IUserRoleRepository : IGeneralRepository<UserRole>
{
    UserRole? CheckUserRole(Guid userGuid, Guid roleGuid);
}
