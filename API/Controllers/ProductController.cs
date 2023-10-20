using API.DataTransferObjects.Categories;
using API.DataTransferObjects.Products;
using API.DataTransferObjects.Transactions;
using API.Services;
using API.Utilities.Handlers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var products = _productService.Get();

        if (!products.Any())
        {
            return NotFound(new ResponseHandler<ProductDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No products found",
                Data = null
            });
        }

        return Ok(new ResponseHandler<IEnumerable<ProductDtoGet>>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Products found",
            Data = products
        });
    }

    [HttpGet("{guid}")]
    public IActionResult Get(Guid guid)
    {
        var product = _productService.Get(guid);
        if (product is null)
        {
            return NotFound(new ResponseHandler<ProductDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No product found",
                Data = null
            });
        }
        return Ok(new ResponseHandler<ProductDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Product found",
            Data = product
        });
    }

    [HttpGet("CheckDuplicate/{name}/{supplierGuid}/{categoryGuid}")]
    public IActionResult Get(string name, Guid supplierGuid, Guid categoryGuid)
    {
        var product = _productService.CheckDuplicate(name, supplierGuid, categoryGuid);
        if (product is null)
        {
            return NotFound(new ResponseHandler<ProductDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "No product found",
                Data = null
            });
        }
        return Ok(new ResponseHandler<ProductDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Product found",
            Data = product
        });
    }

    [HttpPost]
    public IActionResult Create(ProductDtoCreate productDtoCreate)
    {
        var productCreated = _productService.Create(productDtoCreate);
        if (productCreated is null)
        {
            return BadRequest(new ResponseHandler<ProductDtoCreate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Product not created",
                Data = null
            });
        }
        return Ok(new ResponseHandler<ProductDtoCreate>
        {
            Code = StatusCodes.Status201Created,
            Status = HttpStatusCode.Created.ToString(),
            Message = "Product created",
            Data = productCreated
        });
    }

    [HttpPut]
    public IActionResult Update(ProductDtoUpdate productDtoUpdate)
    {
        var productUpdated = _productService.Update(productDtoUpdate);

        if (productUpdated == -1)
        {
            return NotFound(new ResponseHandler<ProductDtoUpdate>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Product not found",
                Data = null
            });
        }
        if (productUpdated == 0)
        {
            return BadRequest(new ResponseHandler<ProductDtoUpdate>
            {
                Code = StatusCodes.Status400BadRequest,
                Status = HttpStatusCode.BadRequest.ToString(),
                Message = "Product not updated",
                Data = null
            });
        }
        return Ok(new ResponseHandler<ProductDtoUpdate>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Product updated",
            Data = productDtoUpdate
        });
    }

    [HttpDelete("{guid}")]
    public IActionResult Delete(Guid guid)
    {
        var productDeleted = _productService.Delete(guid);

        if (productDeleted == -1)
        {
            return NotFound(new ResponseHandler<ProductDtoGet>
            {
                Code = StatusCodes.Status404NotFound,
                Status = HttpStatusCode.NotFound.ToString(),
                Message = "Product not found",
                Data = null
            });
        }
        if (productDeleted == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseHandler<ProductDtoGet>
            {
                Code = StatusCodes.Status500InternalServerError,
                Status = HttpStatusCode.InternalServerError.ToString(),
                Message = "Product not deleted",
                Data = null
            });
        }
        return Ok(new ResponseHandler<ProductDtoGet>
        {
            Code = StatusCodes.Status200OK,
            Status = HttpStatusCode.OK.ToString(),
            Message = "Product deleted",
        });
    }
}
