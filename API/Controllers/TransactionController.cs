using API.DataTransferObjects.Transactions;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var transactions = _transactionService.Get();

        if (!transactions.Any())
        {
            return NotFound(new ResponseHandler<TransactionDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No transactions found",
                Data = null
            });
        }

        return Ok(new ResponseHandler<IEnumerable<TransactionDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Transactions found",
            Data = transactions
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var transacation = _transactionService.Get(guid);
        if (transacation is null)
        {
            return NotFound(new ResponseHandler<TransactionDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No transaction found",
                Data = null
            });
        }
        return Ok(new ResponseHandler<TransactionDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Transaction found",
            Data = transacation
        });
    }

    [HttpPost]
    public IActionResult Create(TransactionDtoCreate transactionDtoCreate)
    {
        var transactionCreated = _transactionService.Create(transactionDtoCreate);
        if (transactionCreated is null)
        {
            return BadRequest(new ResponseHandler<TransactionDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Transaction not created",
                Data = null
            });
        }
        return Ok(new ResponseHandler<TransactionDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Transaction created",
            Data = transactionCreated
        });
    }

    [HttpPut]
    public IActionResult Update(TransactionDtoUpdate transactionDtoUpdate)
    {
        var transactionUpdated = _transactionService.Update(transactionDtoUpdate);

        if (transactionUpdated == -1)
        {
            return NotFound(new ResponseHandler<TransactionDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Transaction not found",
                Data = null
            });
        }
        if (transactionUpdated == 0)
        {
            return BadRequest(new ResponseHandler<TransactionDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Transaction not updated",
                Data = null
            });
        }
        return Ok(new ResponseHandler<TransactionDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Transaction updated",
            Data = transactionDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var transactionDeleted = _transactionService.Delete(guid);

        if (transactionDeleted == -1)
        {
            return NotFound(new ResponseHandler<TransactionDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Transaction not found",
                Data = null
            });
        }
        if (transactionDeleted == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<TransactionDtoGet>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "Transaction not deleted",
                Data = null
            });
        }
        return Ok(new ResponseHandler<TransactionDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Transaction deleted",
        });
    }
}
