using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repositories;

public class TransactionRepository : GeneralRepository<Transaction>, ITransactionRepository
{
    public TransactionRepository(InventoryDbContext context) : base(context)
    {
    }
}
