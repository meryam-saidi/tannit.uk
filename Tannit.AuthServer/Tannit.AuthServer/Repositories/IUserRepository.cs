using Tannit.AuthServer.Models;

namespace Tannit.AuthServer.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(Guid userId);
        Task<bool> ValidateCredentialsAsync(string email, string password);
        Task AddUserAsync(User user);
    }
}
