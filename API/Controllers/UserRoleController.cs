using API.DataTransferObjects.Roles;
using API.DataTransferObjects.UserRoles;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
/*[Authorize]*/
public class UserRoleController : ControllerBase
{
    private readonly UserRoleService _userRoleService;

    public UserRoleController(UserRoleService userRoleService)
    {
        _userRoleService = userRoleService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var userRoles = _userRoleService.Get();

        if (!userRoles.Any())
        {
            return NotFound(new ResponseHandler<UserRoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User role not found"
            });
        }

        return Ok(new ResponseHandler<IEnumerable<UserRoleDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User roles found",
            Data = userRoles
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var userRole = _userRoleService.Get(guid);
        if (userRole is null)
        {
            return NotFound(new ResponseHandler<UserRoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User role not found"
            });
        }

        return Ok(new ResponseHandler<UserRoleDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User role found",
            Data = userRole
        });
    }

    [HttpPost]
    public IActionResult Create(UserRoleDtoCreate userRoleDtoCreate)
    {
        var userRoleCreated = _userRoleService.Create(userRoleDtoCreate);
        if(userRoleCreated is null)
        {
            return BadRequest(new ResponseHandler<UserRoleDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "User role not created"
            });
        }

        return Ok(new ResponseHandler<UserRoleDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "User role successfully created",
            Data = userRoleCreated
        });
    }

    [HttpPut]
    public IActionResult Update(UserRoleDtoUpdate userRoleDtoUpdate)
    {
        var userRoleUpdated = _userRoleService.Update(userRoleDtoUpdate);

        if(userRoleUpdated is -1)
        {
            return NotFound(new ResponseHandler<UserRoleDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User role not found"
            });
        }

        if(userRoleUpdated is 0)
        {
            return BadRequest(new ResponseHandler<UserRoleDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "User role not updated"
            });
        }

        return Ok(new ResponseHandler<UserRoleDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User role successfully updated",
            Data = userRoleDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var userRoleDeleted = _userRoleService.Delete(guid);

        if(userRoleDeleted is -1)
        {
            return NotFound(new ResponseHandler<UserRoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User role not found"
            });
        }

        if(userRoleDeleted is 0)
        {
            return BadRequest(new ResponseHandler<UserRoleDtoGet>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "User role not deleted"
            });
        }

        return Ok(new ResponseHandler<UserRoleDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User role successfully deleted"
        });
    }
}
