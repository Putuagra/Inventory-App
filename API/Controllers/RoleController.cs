using API.DataTransferObjects.Roles;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
/*[Authorize]*/
public class RoleController : ControllerBase
{
    private readonly RoleService _roleService;

    public RoleController(RoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var roles = _roleService.Get();
        if (!roles.Any())
        {
            return NotFound(new ResponseHandler<RoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Role not found"
            });
        }
        return Ok(new ResponseHandler<IEnumerable<RoleDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Roles found",
            Data = roles
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var role = _roleService.Get(guid);
        if (role is null)
        {
            return NotFound(new ResponseHandler<RoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Role not found"
            });
        }

        return Ok(new ResponseHandler<RoleDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Role found",
            Data = role
        });
    }

    [HttpGet("ByName/{name}")]
    public IActionResult GetName(string name)
    {
        var role = _roleService.Get(name);

        if (role is null)
        {
            return NotFound(new ResponseHandler<RoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Role not found"
            });
        }

        return Ok(new ResponseHandler<RoleDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Role found",
            Data = role
        });
    }

    [HttpPost]
    public IActionResult Create(RoleDtoCreate roleDtoCreate)
    {
        var roleCrated = _roleService.Create(roleDtoCreate);
        if (roleCrated is null)
        {
            return BadRequest(new ResponseHandler<RoleDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Role not created"
            });
        }

        return Ok(new ResponseHandler<RoleDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Role successfully created",
            Data = roleCrated
        });
    }

    [HttpPut]
    public IActionResult Update(RoleDtoUpdate roleDtoUpdate)
    {
        var roleUpdated = _roleService.Update(roleDtoUpdate);
        if (roleUpdated is -1)
        {
            return NotFound(new ResponseHandler<RoleDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Role not found"
            });
        }

        if (roleUpdated is 0)
        {
            return BadRequest(new ResponseHandler<RoleDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Role not updated"
            });
        }

        return Ok(new ResponseHandler<RoleDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Role successfully updated",
            Data = roleDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var roleDeleted = _roleService.Delete(guid);
        if (roleDeleted is -1)
        {
            return NotFound(new ResponseHandler<RoleDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Role not found"
            });
        }

        if (roleDeleted is 0)
        {
            return BadRequest(new ResponseHandler<RoleDtoGet>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Role not deleted"
            });
        }

        return Ok(new ResponseHandler<RoleDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Role successfully deleted"
        });
    }
}
