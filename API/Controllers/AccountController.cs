using API.DataTransferObjects.Accounts;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountController(AccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var accounts = _accountService.Get();
        if (!accounts.Any())
        {
            return NotFound(new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Account not found"
            });
        }
        return Ok(new ResponseHandler<IEnumerable<AccountDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Accounts found",
            Data = accounts
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var account = _accountService.Get(guid);
        if (account is null)
        {
            return NotFound(new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Account not found"
            });
        }

        return Ok(new ResponseHandler<AccountDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Account found",
            Data = account
        });
    }

    [HttpPost]
    public IActionResult Create(AccountDtoCreate accountDtoCreate)
    {
        var accountCrated = _accountService.Create(accountDtoCreate);
        if (accountCrated is null)
        {
            return BadRequest(new ResponseHandler<AccountDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Account not created"
            });
        }

        return Ok(new ResponseHandler<AccountDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Account successfully created",
            Data = accountCrated
        });
    }

    [HttpPut]
    public IActionResult Update(AccountDtoUpdate accountDtoUpdate)
    {
        var accountUpdated = _accountService.Update(accountDtoUpdate);
        if (accountUpdated is -1)
        {
            return NotFound(new ResponseHandler<AccountDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Account not found"
            });
        }

        if (accountUpdated is 0)
        {
            return BadRequest(new ResponseHandler<AccountDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Account not updated"
            });
        }

        return Ok(new ResponseHandler<AccountDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Account successfully updated",
            Data = accountDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var accountDeleted = _accountService.Delete(guid);
        if (accountDeleted is -1)
        {
            return NotFound(new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Account not found"
            });
        }

        if (accountDeleted is 0)
        {
            return BadRequest(new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Account not deleted"
            });
        }

        return Ok(new ResponseHandler<AccountDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Account successfully deleted"
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login(AccountDtoLogin accountDtoLogin)
    {
        var login = _accountService.Login(accountDtoLogin);
        if (login == "0")
            return NotFound(new ResponseHandler<AccountDtoLogin>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "User not found"
            });
        if (login == "-1")
            return BadRequest(new ResponseHandler<AccountDtoLogin>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Password is incorrect"
            });
        if (login == "-2")
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<AccountDtoLogin>
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

    [AllowAnonymous]
    [HttpPost("ForgotPassword")]
    public IActionResult ForgotPassword(AccountDtoForgotPassword accountDtoForgotPassword)
    {
        var isUpdated = _accountService.ForgotPassword(accountDtoForgotPassword);

        if (isUpdated == 0)
            return NotFound(new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Email not found",
                Data = null
            });

        if (isUpdated is -1)
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<AccountDtoGet>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "Error retrieving data from the database",
                Data = null
            });

        return Ok(new ResponseHandler<AccountDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Otp has been sent to your email",
            Data = null
        });
    }

    [AllowAnonymous]
    [HttpPost("ChangePassword")]
    public IActionResult ChangePassword(AccountDtoChangePassword accountDtoChangePassword)
    {
        var isUpdated = _accountService.ChangePassword(accountDtoChangePassword);

        if (isUpdated == 0)
            return NotFound(new ResponseHandler<AccountDtoChangePassword>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Email not found"
            });

        if (isUpdated == -1)
        {
            return BadRequest(new ResponseHandler<AccountDtoChangePassword>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Otp is already used"
            });
        }

        if (isUpdated == -2)
        {
            return BadRequest(new ResponseHandler<AccountDtoChangePassword>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Otp is incorrect"
            });
        }

        if (isUpdated == -3)
        {
            return BadRequest(new ResponseHandler<AccountDtoChangePassword>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Otp is expired"
            });
        }

        if (isUpdated is -4)
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<AccountDtoChangePassword>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "Error retrieving data from the database"
            });

        return Ok(new ResponseHandler<AccountDtoChangePassword>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Password has been changed successfully"
        });
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Regiter(AccountDtoRegister accountDtoRegister)
    {
        var isCreated = _accountService.Register(accountDtoRegister);
        if (!isCreated)
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<AccountDtoRegister>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "User not registered",
                Data = null
            });
        return Ok(new ResponseHandler<AccountDtoRegister>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "User registered",
            Data = accountDtoRegister
        });
    }
}
