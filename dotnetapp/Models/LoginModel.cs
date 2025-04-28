namespace dotnetapp.Models
{
    // Represents the login credentials provided by the user
    public class LoginModel
    {
        // Stores the user's email address for authentication
        public string Email { get; set; }

        // Stores the user's password for authentication
        public string Password { get; set; }
    }
}