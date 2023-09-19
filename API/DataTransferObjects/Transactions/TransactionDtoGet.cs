using API.Models;

namespace API.DataTransferObjects.Transactions;

public class TransactionDtoGet
{
    public Guid Guid { get; set; }
    public Guid UserGuid { get; set; }
    public Guid ProductGuid { get; set; }
    public int Quantity { get; set; }

    public static implicit operator Transaction(TransactionDtoGet transactionDtoGet)
    {
        return new()
        {
            Guid = transactionDtoGet.Guid,
            UserGuid = transactionDtoGet.UserGuid,
            ProductGuid = transactionDtoGet.ProductGuid,
            Quantity = transactionDtoGet.Quantity,
        };
    }

    public static explicit operator TransactionDtoGet(Transaction transaction)
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
