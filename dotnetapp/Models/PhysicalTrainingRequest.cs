using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
 
namespace dotnetapp.Models
{
    [Index(nameof(PhysicalTrainingRequestId), Name = "Idx_PhysicalTrainingRequest_PhysicalTrainingRequestId")] // Apply index directly on PhysicalTrainingRequestId

    // Represents a request for a physical training session made by a user
    public class PhysicalTrainingRequest
    {
        // Unique identifier for the training request
        [Key]
        public int PhysicalTrainingRequestId { get; set; }
 
        // User ID of the person making the request (required field)
        [Required(ErrorMessage = "User ID is required.")]
        [ForeignKey("User")]
        public int UserId { get; set; }
 
        // Navigation property for the user who made the request
        // Ignored during JSON serialization to prevent circular dependency
        [JsonIgnore]
        public User? User { get; set; }
 
        // Physical training ID for the requested session (required field)
        [Required(ErrorMessage = "Physical Training ID is required.")]
        [ForeignKey("PhysicalTraining")]
        public int PhysicalTrainingId { get; set; }
 
        // Navigation property for the requested physical training session
        [JsonIgnore]
        public PhysicalTraining? PhysicalTraining { get; set; }
 
        // Date when the request was made
        [Required(ErrorMessage = "Request date is required.")]
        [DataType(DataType.Date, ErrorMessage= "Date format should be dd-MM-yyyy.")]
        public string RequestDate { get; set; }
 
        // Status of the request (e.g., Pending, Approved, Rejected)
        [Required(ErrorMessage = "Request status is required.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Status must be between 3 and 20 characters long.")]
        public string Status { get; set; }
 
        // Any existing health conditions relevant to the training request
        [Required(ErrorMessage = "Health conditions must be specified.")]
        [StringLength(300, MinimumLength = 5, ErrorMessage = "Health conditions must be between 5 and 300 characters long.")]
        public string HealthConditions { get; set; }
 
        // Fitness goals that the user aims to achieve through training
        [Required(ErrorMessage = "Fitness goals must be specified.")]
        [StringLength(300, MinimumLength = 5, ErrorMessage = "Fitness goals must be between 5 and 300 characters long.")]
        public string FitnessGoals { get; set; }
 
        // Additional comments provided by the user
        
        [StringLength(500, ErrorMessage = "Comments must be at most 500 characters long.")]
        public string? Comments { get; set; }
    }
}
 