﻿using API.Models;

namespace API.Contracts;

public interface IUserRepository : IGeneralRepository<User>
{
    bool IsDuplicateValue(string value);
    User? GetUserByEmail(string email);

}
