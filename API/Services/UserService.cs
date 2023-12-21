using API.Contracts;
using API.Data;
using API.DataTransferObjects.Users;

namespace API.Services;

public class UserService
{
    private readonly InventoryDbContext _inventoryDbContext;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserRepository _userRepository;
    private readonly IAccountRoleRepository _accountRoleRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly ITokenHandler _tokenHandler;
    private readonly IEmailHandler _emailHandler;

    public UserService(IUserRepository userRepository, InventoryDbContext inventoryDbContext, ITokenHandler tokenHandler, IEmailHandler emailHandler, IAccountRoleRepository accountRoleRepository, IRoleRepository roleRepository, IAccountRepository accountRepository)
    {
        _userRepository = userRepository;
        _inventoryDbContext = inventoryDbContext;
        _tokenHandler = tokenHandler;
        _emailHandler = emailHandler;
        _accountRoleRepository = accountRoleRepository;
        _roleRepository = roleRepository;
        _accountRepository = accountRepository;
    }

    public IEnumerable<UserDtoGet> Get()
    {
        var users = _userRepository.GetAll().ToList();
        if (!users.Any()) return Enumerable.Empty<UserDtoGet>();
        List<UserDtoGet> userDtoGets = new List<UserDtoGet>();
        foreach (var user in users)
        {
            userDtoGets.Add((UserDtoGet)user);
        }

        return userDtoGets;
    }

    public UserDtoGet? Get(Guid guid)
    {
        var user = _userRepository.GetByGuid(guid);
        if (user is null) return null;
        return (UserDtoGet)user;
    }

    public UserDtoGet? Get(string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user is null) return null;
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

    public IEnumerable<UserDtoGet> GetByRole(Guid roleGuid)
    {
        var userByRole = (from user in _userRepository.GetAll()
                          join account in _accountRepository.GetAll() on user.Guid equals account.Guid
                          join accountRole in _accountRoleRepository.GetAll() on account.Guid equals accountRole.AccountGuid
                          join role in _roleRepository.GetAll() on accountRole.RoleGuid equals role.Guid
                          where accountRole.RoleGuid == roleGuid
                          select (UserDtoGet)user).ToList();

        return userByRole;
    }

    public IEnumerable<UserDtoGet> GetExcludeRole(Guid roleGuid)
    {
        var userByRole = GetByRole(roleGuid);
        var users = _userRepository.GetAll();

        var usersByRoleGuid = userByRole.Select(user => user.Guid).ToList();
        var userExcludeRole = users.Where(user => !usersByRoleGuid.Contains(user.Guid)).ToList();

        if (!userExcludeRole.Any()) return Enumerable.Empty<UserDtoGet>();
        List<UserDtoGet> userDtoGets = new();

        foreach (var user in userExcludeRole) userDtoGets.Add((UserDtoGet)user);

        return userDtoGets;
    }
}
