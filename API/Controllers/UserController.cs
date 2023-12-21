using API.DataTransferObjects.Users;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var users = _userService.Get();

        if (!users.Any())
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No users found",
                Data = null
            });
        }

        return Ok(new ResponseHandler<IEnumerable<UserDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Users found",
            Data = users
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var user = _userService.Get(guid);
        if (user is null)
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No user found",
                Data = null
            });
        }
        return Ok(new ResponseHandler<UserDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User found",
            Data = user
        });
    }

    [AllowAnonymous]
    [HttpGet("ByEmail/{email}")]
    public IActionResult Get(string email)
    {
        var user = _userService.Get(email);
        if (user is null)
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No user found",
                Data = null
            });
        }
        return Ok(new ResponseHandler<UserDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User found",
            Data = user
        });
    }

    [HttpPost]
    public IActionResult Create(UserDtoCreate userDtoCreate)
    {
        var userCreated = _userService.Create(userDtoCreate);
        if (userCreated is null)
        {
            return BadRequest(new ResponseHandler<UserDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "User not created",
                Data = null
            });
        }
        return Ok(new ResponseHandler<UserDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "User created",
            Data = userCreated
        });
    }

    [HttpPut]
    public IActionResult Update(UserDtoUpdate userDtoUpdate)
    {
        var userUpdated = _userService.Update(userDtoUpdate);

        if (userUpdated == -1)
        {
            return NotFound(new ResponseHandler<UserDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found",
                Data = null
            });
        }
        if (userUpdated == 0)
        {
            return BadRequest(new ResponseHandler<UserDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "User not updated",
                Data = null
            });
        }
        return Ok(new ResponseHandler<UserDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User updated",
            Data = userDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var userDeleted = _userService.Delete(guid);

        if (userDeleted == -1)
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found",
                Data = null
            });
        }
        if (userDeleted == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "User not deleted",
                Data = null
            });
        }
        return Ok(new ResponseHandler<UserDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User deleted",
        });
    }

    [AllowAnonymous]
    [HttpGet("GetByRole/{guid}")]
    public IActionResult GetByRole(Guid guid)
    {
        var users = _userService.GetByRole(guid);

        if (!users.Any())
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No user found",
                Data = null
            });
        }

        return Ok(new ResponseHandler<IEnumerable<UserDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Users found",
            Data = users
        });
    }

    [AllowAnonymous]
    [HttpGet("GetExcludeRole/{guid}")]
    public IActionResult GetExcludeRole(Guid guid)
    {
        var users = _userService.GetExcludeRole(guid);

        if (!users.Any())
        {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No user found",
                Data = null
            });
        }

        return Ok(new ResponseHandler<IEnumerable<UserDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Users found",
            Data = users
        });
    }
}
