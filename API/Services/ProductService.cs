using API.Contracts;
using API.DataTransferObjects.Categories;
using API.DataTransferObjects.Products;
using API.Repositories;

namespace API.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public IEnumerable<ProductDtoGet> Get()
    {
        var products = _productRepository.GetAll().ToList();
        if(!products.Any()) return Enumerable.Empty<ProductDtoGet>();
        List<ProductDtoGet> productDtoGets = new List<ProductDtoGet>();
        foreach (var product in products)
        {
            productDtoGets.Add((ProductDtoGet)product);
        }
        return productDtoGets;
    }

    public ProductDtoGet? Get(Guid guid)
    {
        var product = _productRepository.GetByGuid(guid);
        if (product is null) return null;
        return (ProductDtoGet)product;
    }

    public ProductDtoGet? CheckDuplicate(string name, Guid supplierGuid, Guid categoryGuid)
    {
        var product = _productRepository.CheckDuplicate(name, supplierGuid, categoryGuid);
        if (product is null) return null;

        return (ProductDtoGet)product;
    }

    public ProductDtoCreate? Create(ProductDtoCreate productDtoCreate)
    {
        var productCreated = _productRepository.Create(productDtoCreate);
        if (productCreated is null) return null;
        return (ProductDtoCreate)productCreated;
    }

    public int Update(ProductDtoUpdate productDtoUpdate)
    {
        var product = _productRepository.GetByGuid(productDtoUpdate.Guid);
        if (product is null) return -1;
        var productUpdated = _productRepository.Update(productDtoUpdate);
        return productUpdated ? 1 : 0;
    }

    public int Delete(Guid guid) {
        var product = _productRepository.GetByGuid(guid);
        if (product is null) return -1;
        var productDeleted = _productRepository.Delete(product);
        return productDeleted ? 1 : 0;
    }
}
