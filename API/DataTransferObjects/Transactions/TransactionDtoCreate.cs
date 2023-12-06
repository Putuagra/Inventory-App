using API.Models;

namespace API.DataTransferObjects.Transactions;

public class TransactionDtoCreate
{
    public Guid UserGuid { get; set; }
    public Guid ProductGuid { get; set; }
    public int Quantity { get; set; }

    public static implicit operator Transaction(TransactionDtoCreate transactionDtoCreate)
    {
        return new()
        {
            UserGuid = transactionDtoCreate.UserGuid,
            ProductGuid = transactionDtoCreate.ProductGuid,
            Quantity = transactionDtoCreate.Quantity
        };
    }

    public static explicit operator TransactionDtoCreate(Transaction transaction)
    {
        return new()
        {
            UserGuid = transaction.UserGuid,
            ProductGuid = transaction.ProductGuid,
            Quantity = transaction.Quantity
        };
    }
}
