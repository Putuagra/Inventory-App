using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class UserRepository : GeneralRepository<User>, IUserRepository
{
    public UserRepository(InventoryDbContext context) : base(context)
    {
    }

    public bool IsDuplicateValue(string value)
    {
        return Context.Set<User>().FirstOrDefault(u => u.Email.Contains(value)) is null;
    }

    public User? GetUserByEmail(string email)
    {
        return Context.Set<User>().FirstOrDefault(u => u.Email == email);
    }
}
