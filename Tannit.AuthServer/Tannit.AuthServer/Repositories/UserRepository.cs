using Dapper;
using System.Data.SqlClient;
using Tannit.AuthServer.Models;
using Microsoft.Extensions.Configuration;
using Tannit.AuthServer.Services;
using System.Data;

namespace Tannit.AuthServer.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _db;
        private readonly PasswordService _passwordService;

        public UserRepository(IDbConnection db, PasswordService passwordService)
        {
            _db = db;
            _passwordService = passwordService;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            const string sql = "SELECT * FROM Users WHERE Email = @Email";
            return await _db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User?> GetByIdAsync(Guid userId)
        {
            const string sql = "SELECT Id, Email, PasswordHash, Balance FROM Users WHERE Id = @Id";
            return await _db.QuerySingleOrDefaultAsync<User>(sql, new { Id = userId });
        }

        public async Task<bool> ValidateCredentialsAsync(string email, string password)
        {
            var user = await GetByEmailAsync(email);
            if (user == null) return false;


            return _passwordService.VerifyPassword(password, user.PasswordHash);
        }

        public async Task AddUserAsync(User user)
        {
            var sql = @"
        INSERT INTO Users (Id, Email, PasswordHash, Role, Balance)
        VALUES (@Id, @Email, @PasswordHash,@Role, @Balance)";

            await _db.ExecuteAsync(sql, user);
        }
    }
}
