using API.Contracts;
using API.Data;
using API.DataTransferObjects.Accounts;
using API.Models;
using API.Utilities.Handlers;
using System.Security.Claims;

namespace API.Services;

public class AccountService
{
    private readonly InventoryDbContext _inventoryDbContext;
    private readonly IAccountRepository _accountRepository;
    private readonly IAccountRoleRepository _accountRoleRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITokenHandler _tokenHandler;
    private readonly IEmailHandler _emailHandler;

    public AccountService(IAccountRepository accountRepository, InventoryDbContext inventoryDbContext, IUserRepository userRepository, IRoleRepository roleRepository, IAccountRoleRepository accountRoleRepository, ITokenHandler tokenHandler, IEmailHandler emailHandler)
    {
        _accountRepository = accountRepository;
        _inventoryDbContext = inventoryDbContext;
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _accountRoleRepository = accountRoleRepository;
        _tokenHandler = tokenHandler;
        _emailHandler = emailHandler;
    }

    public IEnumerable<AccountDtoGet> Get()
    {
        var accounts = _accountRepository.GetAll().ToList();
        if (!accounts.Any()) return Enumerable.Empty<AccountDtoGet>();
        List<AccountDtoGet> accountDtoGets = new List<AccountDtoGet>();
        foreach (var account in accounts)
        {
            accountDtoGets.Add((AccountDtoGet)account);
        }
        return accountDtoGets;
    }

    public AccountDtoGet? Get(Guid guid)
    {
        var account = _accountRepository.GetByGuid(guid);
        if (account is null) return null;
        return (AccountDtoGet)account;
    }

    public AccountDtoCreate? Create(AccountDtoCreate accountDtoCreate)
    {
        var accountCreated = _accountRepository.Create(accountDtoCreate);
        if (accountCreated is null) return null;
        return (AccountDtoCreate)accountCreated;
    }

    public int Update(AccountDtoUpdate accountDtoUpdate)
    {
        var account = _accountRepository.GetByGuid(accountDtoUpdate.Guid);
        if (account is null) return -1;
        var accountUpdated = _accountRepository.Update(accountDtoUpdate);
        return accountUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var account = _accountRepository.GetByGuid(guid);
        if (account is null) return -1;
        var accountDeleted = _accountRepository.Delete(account);
        return accountDeleted ? 1 : 0;
    }

    public bool Register(AccountDtoRegister accountDtoRegister)
    {
        using var transaction = _inventoryDbContext.Database.BeginTransaction();

        try
        {
            var user = new User
            {
                Guid = new Guid(),
                Name = accountDtoRegister.Name,
                Email = accountDtoRegister.Email
            };
            _userRepository.Create(user);

            var account = new Account
            {
                Guid = user.Guid,
                Password = HashingHandler.Hash(accountDtoRegister.Password),
                IsUsed = false,
                Otp = 0,
                ExpiredTime = DateTime.Now.AddMinutes(10)
            };
            _accountRepository.Create(account);

            var roleUser = _roleRepository.GetByName("Customer");
            _accountRoleRepository.Create(new AccountRole
            {
                AccountGuid = account.Guid,
                RoleGuid = roleUser.Guid
            });

            transaction.Commit();
            return true;
        }
        catch
        {
            transaction.Rollback();
            return false;
        }
    }

    public string Login(AccountDtoLogin accountDtoLogin)
    {
        var user = _userRepository.GetUserByEmail(accountDtoLogin.Email);
        if (user is null) return "0";

        var account = _accountRepository.GetByGuid(user.Guid);
        if (account is null) return "0";

        if (!HashingHandler.Validate(accountDtoLogin.Password, account!.Password)) return "-1";

        try
        {
            var claims = new List<Claim>()
            {
                new Claim("Guid", user.Guid.ToString()),
                new Claim("Name", $"{user.Name}"),
            };
            var accountRoles = _accountRoleRepository.GetAccountRolesByAccountGuid(account.Guid);
            var getRolesNameByAccountRole = from accountRole in accountRoles
                                            join role in _roleRepository.GetAll() on accountRole.RoleGuid equals role.Guid
                                            select role.Name;
            claims.AddRange(getRolesNameByAccountRole.Select(role => new Claim(ClaimTypes.Role, role)));
            var token = _tokenHandler.GenerateToken(claims);
            return token;
        }
        catch
        {
            return "-2";
        }
    }

    public int ForgotPassword(AccountDtoForgotPassword accountDtoForgotPassword)
    {
        var user = _userRepository.GetUserByEmail(accountDtoForgotPassword.Email);
        if (user is null) return 0;

        var account = _accountRepository.GetByGuid(user.Guid);
        if (account is null) return -1;

        var otp = new Random().Next(111111, 999999);
        var isUpdated = _accountRepository.Update(new Account
        {
            Guid = account.Guid,
            Password = account.Password,
            Otp = otp,
            ExpiredTime = DateTime.Now.AddMinutes(5),
            IsUsed = false
        });
        if (!isUpdated) return -1;

        _emailHandler.SendEmail(accountDtoForgotPassword.Email, "Forgot Password", $"Your OTP is {otp}");
        return 1;
    }

    public int ChangePassword(AccountDtoChangePassword accountDtoChangePassword)
    {
        using var transaction = _inventoryDbContext.Database.BeginTransaction();
        var user = _userRepository.GetUserByEmail(accountDtoChangePassword.Email);
        if (user is null) return 0;
        var account = _accountRepository.GetByGuid(user.Guid);
        if (account.IsUsed) return -1;
        if (account.Otp != accountDtoChangePassword.Otp) return -2;
        if (account.ExpiredTime < DateTime.Now) return -3;

        try
        {
            var isUpdated = _accountRepository.Update(new Account
            {
                Guid = account.Guid,
                Password = HashingHandler.Hash(accountDtoChangePassword.NewPassword),
                Otp = account.Otp,
                ExpiredTime = account.ExpiredTime,
                IsUsed = true,
            });
            transaction.Commit();
            return 1;
        }
        catch
        {
            transaction.Rollback();
            return -4;
        }
    }
}
