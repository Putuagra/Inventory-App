using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class RoleRepository : GeneralRepository<Role>, IRoleRepository
{
    public RoleRepository(InventoryDbContext context) : base(context)
    {
    }

    public Role? GetByName(string name)
    {
        return Context.Set<Role>().FirstOrDefault(r => r.Name.ToLower() == name.ToLower());
    }
}
