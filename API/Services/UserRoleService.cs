using API.Contracts;
using API.DataTransferObjects.Products;
using API.DataTransferObjects.UserRoles;
using API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class UserRoleService
{
    private readonly IUserRoleRepository _userRoleRepository;

    public UserRoleService(IUserRoleRepository userRoleRepository)
    {
        _userRoleRepository = userRoleRepository;
    }

    public IEnumerable<UserRoleDtoGet> Get()
    {
        var userRoles = _userRoleRepository.GetAll().ToList();
        if(!userRoles.Any()) return Enumerable.Empty<UserRoleDtoGet>();
        List<UserRoleDtoGet> userRoleDtoGets = new List<UserRoleDtoGet>();
        foreach(var userRole in userRoles)
        {
            userRoleDtoGets.Add((UserRoleDtoGet)userRole);
        }
        return userRoleDtoGets;
    }

    public UserRoleDtoGet? Get(Guid guid)
    {
        var userRole = _userRoleRepository.GetByGuid(guid);
        if(userRole is null) return null;
        return (UserRoleDtoGet)userRole;
    }

    public UserRoleDtoCreate? Create(UserRoleDtoCreate userRoleDtoCreate)
    {
        var userRoleCreated = _userRoleRepository.Create(userRoleDtoCreate);
        if( userRoleCreated is null ) return null;
        return((UserRoleDtoCreate)userRoleCreated);
    }

    public int Update(UserRoleDtoUpdate userRoleDtoUpdate)
    {
        var userRole = _userRoleRepository.GetByGuid(userRoleDtoUpdate.Guid);
        if( userRole is null ) return -1;
        var userRoleUpdated = _userRoleRepository.Update(userRoleDtoUpdate);
        return userRoleUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var userRole = _userRoleRepository.GetByGuid(guid);
        if(userRole is null) return -1;
        var userRoleDeleted = _userRoleRepository.Delete(userRole);
        return userRoleDeleted ? 1 : 0;
    }

    public UserRoleDtoGet? CheckUserRole(Guid userGuid, Guid roleGuid)
    {
        var userRole = _userRoleRepository.CheckUserRole(userGuid, roleGuid);
        if (userRole is null) return null;

        return (UserRoleDtoGet)userRole;
    }
}
