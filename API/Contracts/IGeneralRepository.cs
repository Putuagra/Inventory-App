namespace API.Contracts;

public interface IGeneralRepository<TEntity>
{
    ICollection<TEntity> GetAll();
    TEntity? Get(Guid guid);
    TEntity? Create(TEntity entity);
    bool Update(TEntity entity);
    bool Delete(TEntity entity);
}
