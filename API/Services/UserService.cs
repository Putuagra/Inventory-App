using API.Contracts;
using API.Data;
using API.DataTransferObjects.Users;
using API.Models;

namespace API.Services;

public class UserService
{
    private readonly InventoryDbContext _inventoryDbContext;
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository, InventoryDbContext inventoryDbContext)
    {
        _userRepository = userRepository;
        _inventoryDbContext = inventoryDbContext;
    }

    public IEnumerable<UserDtoGet> Get()
    {
        var users = _userRepository.GetAll().ToList();
        if(!users.Any()) return Enumerable.Empty<UserDtoGet>();
        List<UserDtoGet> userDtoGets = new List<UserDtoGet>();
        foreach(var user in users)
        {
            userDtoGets.Add((UserDtoGet)user);
        }

        return userDtoGets;
    }

    public UserDtoGet? Get(Guid guid)
    {
        var user = _userRepository.GetByGuid(guid);
        if(user is null) return null;
        return (UserDtoGet)user;
    }

    public UserDtoCreate? Create(UserDtoCreate userDtoCreate)
    {
        var userCreated = _userRepository.Create(userDtoCreate);
        if (userCreated is null) return null;
        return (UserDtoCreate)userCreated;

    }

    public int Update(UserDtoUpdate userDtoUpdate)
    {
        var user = _userRepository.GetByGuid(userDtoUpdate.Guid);
        if (user is null) return -1;
        var userUpdated = _userRepository.Update(userDtoUpdate);
        return userUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var user = _userRepository.GetByGuid(guid);
        if (user is null) return -1;
        var userDeleted = _userRepository.Delete(user);
        return userDeleted ? 1 : 0;
    }

    public bool Register(UserDtoRegister userDtoRegister)
    {
        using var transaction = _inventoryDbContext.Database.BeginTransaction();

        try
        {
            _userRepository.Create(userDtoRegister);
            transaction.Commit();
            return true;
        }catch 
        {
            transaction.Rollback();
            return false;
        }
    }
}
