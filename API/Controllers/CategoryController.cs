using API.DataTransferObjects.Categories;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class CategoryController : ControllerBase
{
    private readonly CategoryServices _services;

    public CategoryController(CategoryServices services)
    {
        _services = services;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var categories = _services.Get();

        if(!categories.Any())
        {
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });
        }

        return Ok(new ResponseHandler<IEnumerable<CategoryDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Categories found",
            Data = categories
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var category = _services.Get(guid);
        if(category is null)
        {
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });
        }

        return Ok(new ResponseHandler<CategoryDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Category found",
            Data = category
        });
    }

    [HttpGet("CheckDuplicate/{name}/{guid}")]
    public IActionResult Get(string name, Guid guid)
    {
        var category = _services.CheckDuplicate(name, guid);
        if (category is null)
        {
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });
        }

        return Ok(new ResponseHandler<CategoryDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Category found",
            Data = category
        });
    }

    [HttpGet("CheckAvailability/{categoryGuid}/{supplierGuid}")]
    public IActionResult Get(Guid categoryGuid, Guid supplierGuid)
    {
        var category = _services.CheckAvailability(categoryGuid, supplierGuid);
        if (category is null)
        {
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });
        }

        return Ok(new ResponseHandler<CategoryDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Category found",
            Data = category
        });
    }

    [HttpPost]
    public IActionResult Create(CategoryDtoCreate categoryDtoCreate) 
    {
        var categoryCreated = _services.Create(categoryDtoCreate);
        if (categoryCreated is null)
            return BadRequest(new ResponseHandler<CategoryDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Category not created"
            });

        return Ok(new ResponseHandler<CategoryDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Category successfully created",
            Data = categoryCreated
        });
    }

    [HttpPut]
    public IActionResult Update(CategoryDtoUpdate categoryDtoUpdate)
    {
        var categoryUpdated = _services.Update(categoryDtoUpdate);
        if (categoryUpdated is -1)
            return NotFound(new ResponseHandler<CategoryDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });

        if (categoryUpdated is 0)
            return BadRequest(new ResponseHandler<CategoryDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Category not updated"
            });

        return Ok(new ResponseHandler<CategoryDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Category successfully updated",
            Data = categoryDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var categoryDeleted = _services.Delete(guid);
        if (categoryDeleted is -1)
            return NotFound(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Category not found"
            });

        if (categoryDeleted is 0)
            return BadRequest(new ResponseHandler<CategoryDtoGet>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Category not deleted"
            });

        return Ok(new ResponseHandler<CategoryDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Category successfully deleted",
        });

    }
}
