using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    // Represents the login credentials provided by the user
    public class LoginModel
    {
        // Stores the user's email address for authentication
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }
 
        // Stores the user's password for authentication
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}