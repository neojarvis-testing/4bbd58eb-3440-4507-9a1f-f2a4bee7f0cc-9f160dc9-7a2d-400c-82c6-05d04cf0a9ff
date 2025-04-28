using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
 
namespace dotnetapp.Models
{
    // Represents an application user, extending IdentityUser for authentication and user management
    public class ApplicationUser : IdentityUser
    {
        // Stores the user's name with a maximum length constraint
        [MaxLength(30)]
        public string Name { get; set; }
    }
}