using API.Contracts;
using API.DataTransferObjects.Transactions;
using API.Models;

namespace API.Services;

public class TransactionService
{
    private readonly ITransactionRepository _transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    public IEnumerable<TransactionDtoGet> Get()
    {
        var transactions = _transactionRepository.GetAll().ToList();
        if(!transactions.Any()) return Enumerable.Empty<TransactionDtoGet>();
        List<TransactionDtoGet> transactionDtoGets = new List<TransactionDtoGet>();
        foreach (var transaction in transactions)
        {
            transactionDtoGets.Add((TransactionDtoGet)transaction);
        }
        return transactionDtoGets;
    }

    public TransactionDtoGet? Get(Guid guid)
    {
        var transaction = _transactionRepository.GetByGuid(guid);
        if (transaction is null) return null;
        return (TransactionDtoGet)transaction;
    }

    public TransactionDtoCreate? Create(TransactionDtoCreate transactionDtoCreate)
    {
        var transactionCreated = _transactionRepository.Create(transactionDtoCreate);
        if (transactionCreated is null) return null;
        return (TransactionDtoCreate)transactionCreated;
    }

    public int Update(TransactionDtoUpdate transactionDtoUpdate)
    {
        var transaction = _transactionRepository.GetByGuid(transactionDtoUpdate.Guid);
        if(transaction is null) return -1;
        var transcationUpdated = _transactionRepository.Update(transactionDtoUpdate);
        return transcationUpdated ? 1 : 0;
    }

    public int Delete(Guid guid)
    {
        var transaction = _transactionRepository.GetByGuid(guid);
        if (transaction is null) return -1;
        var transactionDeleted = _transactionRepository.Delete(transaction);
        return transactionDeleted ? 1 : 0;
    }
}
