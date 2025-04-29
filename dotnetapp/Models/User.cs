using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    // Represents the user in the system (either Admin or regular user)
    public class User
    {
        // Unique identifier for the user
        [Key]
        [JsonIgnore]
        public int UserId { get; set; }
 
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [StringLength(255, ErrorMessage = "Email must be at most 255 characters long.")]
        public string Email { get; set; }
 
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 100 characters long.")]
        public string Password { get; set; }
 
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters long.")]
        public string Username { get; set; }
 
        [Required(ErrorMessage = "Mobile number is required.")]
        [Phone(ErrorMessage = "Invalid mobile number format.")]
        [StringLength(15, ErrorMessage = "Mobile number must be at most 15 characters long.")]
        public string MobileNumber { get; set; }
 
        [Required(ErrorMessage = "User role is required.")]
        [StringLength(20, ErrorMessage = "User role must be at most 20 characters long.")]
        public string UserRole { get; set; }
    }
}
