using System;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using log4net;
using System.Reflection;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod()?.DeclaringType);

        public AuthenticationController(ApplicationDbContext context, IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _context = context;
            _configuration = configuration;
        }

        // Handles user login and returns a JWT token upon successful authentication.
        // Login credentials provided by the user
        // Returns a JWT token if login is successful, otherwise an error message.
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            log.Info($"Login attempt initiated for user: {model.Email}"); // Logging login attempt
            
            try
            {
                var result = await _authService.Login(model);

                if (result.Item1 == 0)
                {
                    log.Warn($"Login failed for user: {model.Email}. Reason: {result.Item2}");
                    return BadRequest(new { Message = result.Item2 });
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    log.Error($"User not found after successful login for: {model.Email}");
                    return BadRequest(new { Message = "User details not found." });
                }

                log.Info($"Login successful for user: {model.Email}");
                return Ok(new { token = result.Item2, User = user });
            }
            catch (Exception ex)
            {
                log.Error($"Unexpected error during login for user: {model.Email}", ex);
                return StatusCode(500, new { Message = "An unexpected error occurred. Please try again later." });
            }
        }

        // Handles new user registration.
        // User details for registration.
        // Returns success or failure message.
        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            log.Info($"Registration attempt initiated for user: {model.Email}");

            try
            {
                if (!ModelState.IsValid)
                {
                    log.Warn($"Registration failed due to invalid model state for user: {model.Email}");
                    return BadRequest(ModelState);
                }

                var result = await _authService.Registration(model, model.UserRole);

                if (result.Item1 == 0)
                {
                    log.Warn($"Registration failed for user: {model.Email}. Reason: {result.Item2}");
                    return BadRequest(new { Message = result.Item2 });
                }

                log.Info($"Registration successful for user: {model.Email}");
                return Ok(new { Message = result.Item2 });
            }
            catch (Exception ex)
            {
                log.Error($"Unexpected error during registration for user: {model.Email}", ex);
                return StatusCode(500, new { Message = "An unexpected error occurred. Please try again later." });
            }
        }
    }
}