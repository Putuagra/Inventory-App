using API.Models;

namespace API.DataTransferObjects.Transactions;

public class TransactionDtoUpdate
{
    public Guid Guid { get; set; }
    public Guid UserGuid { get; set; }
    public Guid ProductGuid { get; set; }
    public int Quantity { get; set; }

    public static implicit operator Transaction(TransactionDtoUpdate transactionDtoUpdate)
    {
        return new()
        {
            Guid = transactionDtoUpdate.Guid,
            UserGuid = transactionDtoUpdate.UserGuid,
            ProductGuid = transactionDtoUpdate.ProductGuid,
            Quantity = transactionDtoUpdate.Quantity,
            ModifiedDate = DateTime.UtcNow,
        };
    }

    public static explicit operator TransactionDtoUpdate(Transaction transaction)
    {
        return new()
        {
            Guid = transaction.Guid,
            UserGuid = transaction.UserGuid,
            ProductGuid = transaction.ProductGuid,
            Quantity = transaction.Quantity
        };
    }
}
