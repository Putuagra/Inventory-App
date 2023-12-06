using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class UserRoleRepository : GeneralRepository<UserRole>, IUserRoleRepository
{
    public UserRoleRepository(InventoryDbContext context) : base(context)
    {
    }
}
