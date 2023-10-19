using API.DataTransferObjects.Categories;
using API.DataTransferObjects.Suppliers;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SupplierController : ControllerBase
{
    private readonly SupplierService _service;

    public SupplierController(SupplierService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var suppliers = _service.Get();

        if(!suppliers.Any())
        {
            return NotFound(new ResponseHandler<SupplierDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });
        }

        return Ok(new ResponseHandler<IEnumerable<SupplierDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier found",
            Data = suppliers
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var supplier = _service.Get(guid);

        if(supplier is null)
        {
            return NotFound(new ResponseHandler<SupplierDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });
        }

        return Ok(new ResponseHandler<SupplierDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier found",
            Data = supplier
        });
    }

    [HttpGet("ByEmail/{email}")]
    public IActionResult GetEmail(string email)
    {
        var supplier = _service.GetEmail(email);

        if (supplier is null)
        {
            return NotFound(new ResponseHandler<SupplierDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });
        }

        return Ok(new ResponseHandler<SupplierDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier found",
            Data = supplier
        });
    }

    [HttpGet("ByPhone/{phone}")]
    public IActionResult GetPhone(string phone)
    {
        var supplier = _service.GetPhoneNumber(phone);

        if (supplier is null)
        {
            return NotFound(new ResponseHandler<SupplierDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });
        }

        return Ok(new ResponseHandler<SupplierDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier found",
            Data = supplier
        });
    }

    [HttpPost]
    public IActionResult Create(SupplierDtoCreate supplierDtoCreate)
    {
        var supplierCreated = _service.Create(supplierDtoCreate);

        if (supplierCreated is null)
            return BadRequest(new ResponseHandler<SupplierDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Supplier not created"
            });

        return Ok(new ResponseHandler<SupplierDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Supplier successfully created",
            Data = supplierCreated
        });
    }

    [HttpPut]
    public IActionResult Update(SupplierDtoUpdate supplierDtoUpdate)
    {
        var supplierUpdated = _service.Update(supplierDtoUpdate);

        if (supplierUpdated is -1)
            return NotFound(new ResponseHandler<SupplierDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });

        if (supplierUpdated is 0)
            return BadRequest(new ResponseHandler<SupplierDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Supplier not updated"
            });

        return Ok(new ResponseHandler<SupplierDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier successfully updated",
            Data = supplierDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var supplierDeleted = _service.Delete(guid);
        if (supplierDeleted is -1)
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not found"
            });

        if (supplierDeleted is 0)
        {
            return BadRequest(new ResponseHandler<SupplierDtoGet>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Supplier not deleted"
            });
        }

        return Ok(new ResponseHandler<SupplierDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Supplier successfully deleted"
        });
    }
}
