﻿using API.Models;

namespace API.Contracts;

public interface ICategoryRepository : IGeneralRepository<Category>
{
    Category? CheckDuplicate(string name, Guid guid);
    Category? CheckAvailability(Guid categoryGuid, Guid supplierGuid);
}
