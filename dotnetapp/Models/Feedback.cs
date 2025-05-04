using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;
 
namespace dotnetapp.Models
{
    // Represents feedback given by a user for a physical training session
    public class Feedback
    {
        // Unique identifier for the feedback
        [Key]
        public int FeedbackId { get; set; }
 
        // User ID of the person who provided the feedback, linking to the User entity
        [Required(ErrorMessage = "User ID is required.")]
        [ForeignKey("User")]
        public int UserId { get; set; }
 
        // Navigation property to reference the User entity
        // Ignored during JSON serialization to prevent circular dependency issues
        [JsonIgnore(Condition=JsonIgnoreCondition.WhenWritingNull)]
        public User? User { get; set; }
 
        // Stores the textual feedback provided by the user
        [Required(ErrorMessage = "Feedback text is required.")]
        [StringLength(500, MinimumLength = 5, ErrorMessage = "Feedback must be between 5 and 500 characters long.")]
        public string FeedbackText { get; set; }
 
        // Date when the feedback was submitted
        [Required(ErrorMessage = "Feedback date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Date format should be dd-MM-yyyy.")]
        public DateTime Date { get; set; }
    }
}
 