using System;
using dotnetapp.Data;
using dotnetapp.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net; // Add this for bcrypt hashing

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var userExists = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (userExists != null)
                return (0, "User already exists");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password); // Hash password

            var appUser = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
                Name = model.Username.Length > 30 ? model.Username.Substring(0, 30) : model.Username
            };

            var identityResult = await userManager.CreateAsync(appUser, model.Password);
            if (!identityResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again");

            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

            await userManager.AddToRoleAsync(appUser, role);

            var newUser = new User
            {
                Email = model.Email,
                Password = hashedPassword, // Store hashed password
                Username = model.Username,
                MobileNumber = model.MobileNumber,
                UserRole = role
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
                return (0, "Invalid email");

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password)) // Verify hashed password
                return (0, "Invalid password");

            var userRoles = await userManager.GetRolesAsync(await userManager.FindByEmailAsync(model.Email));
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username), // Store authenticated user's name
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateToken(authClaims);
            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}