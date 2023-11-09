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
            Message = "users found",
            Data = users
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var user = _userService.Get(guid);
        if(user is null)
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
        if(userCreated is null)
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

        if(userUpdated == -1)
        {
            return NotFound(new ResponseHandler<UserDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found",
                Data = null
            });
        }
        if(userUpdated == 0)
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

        if(userDeleted == -1) {
            return NotFound(new ResponseHandler<UserDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found",
                Data = null
            });
        }
        if(userDeleted == 0)
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
    [HttpPost("register")]
    public IActionResult Regiter(UserDtoRegister userDtoRegister)
    {
        var userCreated = _userService.Register(userDtoRegister);
        if(!userCreated)
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<UserDtoRegister>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "User not registered",
                Data = null
            });
        return Ok(new ResponseHandler<UserDtoRegister>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User registered",
            Data = userDtoRegister
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login(UserDtoLogin userDtoLogin)
    {
        var login = _userService.Login(userDtoLogin);
        if (login == "0")
            return NotFound(new ResponseHandler<UserDtoLogin>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found"
            });
        if (login == "-1")
            return BadRequest(new ResponseHandler<UserDtoLogin>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Password is incorrect"
            });
        if (login == "-2")
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<UserDtoLogin>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "Error retrieving when creating token"
            });
        return Ok(new ResponseHandler<string>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Login Success",
            Data = login
        });
    }
}
