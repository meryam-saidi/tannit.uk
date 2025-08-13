using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tannit.AuthServer.Models.DTOs;
using Tannit.AuthServer.Repositories;
using Tannit.AuthServer.Services;
using static Tannit.AuthServer.Models.DTOs.AuthRequests;

namespace Tannit.AuthServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;

        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                await _authService.RegisterAsync(request.Email, request.Password);
                return Ok(new { message = "Inscription réussie. Un code de vérification a été envoyé à votre e-mail." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var authResult = await _authService.LoginAsync(loginRequest.Email, loginRequest.Password);

            if (!authResult.Success)
            {
                return Unauthorized(new { errors = authResult.Errors });
            }

            return Ok(new
            {
                token = authResult.Token,
                //refreshToken = authResult.RefreshToken
            });
        }


        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID missing in token");

            var userId = Guid.Parse(userIdClaim.Value);
            var profile = await _authService.GetProfileAsync(userId);

            if (profile == null)
                return NotFound();

            return Ok(profile);

        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequest request)
        {
            try
            {
                var token = await _authService.VerifyEmailAsync(request.Email, request.Code);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("claim-reward")]
        public async Task<IActionResult> ClaimReward()
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized("User ID missing in token");
            
            var userId = Guid.Parse(userIdClaim.Value);
            
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            // Exemple : empêcher plusieurs claims si besoin (à adapter selon ton besoin)
            if (user.Balance >= 40) return BadRequest("Reward already claimed");

            user.Balance += 40;
            await _userRepository.UpdateBalanceAsync(user);

            return Ok(new { newBalance = user.Balance });
        }
    }
}
