using Microsoft.AspNetCore.Identity;
using System;
using System.Data;
using Tannit.AuthServer.Models;
using Tannit.AuthServer.Models.DTOs;
using Tannit.AuthServer.Repositories;
using static Duende.IdentityServer.Models.IdentityResources;

namespace Tannit.AuthServer.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly PasswordService _passwordService;
        private readonly JwtService _jwtService;

        public AuthService(IUserRepository userRepo, PasswordService passwordService, JwtService jwtService)
        {
            _userRepo = userRepo;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }

        public async Task<string> RegisterAsync(string email, string password)
        {
            var existingUser = await _userRepo.GetByEmailAsync(email);
            if (existingUser != null)
                throw new Exception("Email déjà utilisé");

            var hash = _passwordService.HashPassword(password);
            var user = new User { Id = Guid.NewGuid(), Email = email, PasswordHash = hash, Role = "User", Balance = 0 };

            await _userRepo.AddUserAsync(user);

            return _jwtService.GenerateToken(user);
        }

        public async Task<AuthResult> LoginAsync(string email, string password)
        {
            var user = await _userRepo.GetByEmailAsync(email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return AuthResult.Fail("Invalid credentials");

            var token = _jwtService.GenerateToken(user);
            return AuthResult.SuccessResult(token);
        }

        public async Task<UserProfileDto?> GetProfileAsync(Guid userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);

            if (user == null)
                return null;

            return new UserProfileDto
            {
                Id = user.Id.ToString(),
                Email = user.Email,
                Balance = user.Balance.ToString()
            };
        }


    }
}
