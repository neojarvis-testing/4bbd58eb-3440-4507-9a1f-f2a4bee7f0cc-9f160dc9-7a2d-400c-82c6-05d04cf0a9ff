using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
 
namespace dotnetapp.Models
{

    [Index(nameof(TrainerName), Name = "Idx_PhysicalTraining_TrainingName")] //Apply index directly to TrainingName
    [Index(nameof(Description), Name = "Idx_PhysicalTraining_Description")] //Apply index directly to Description
    [Index(nameof(FocusArea), Name = "Idx_PhysicalTraining_FocusArea")] //Apply index directly to FocusArea
    
    // Represents a physical training session
    public class PhysicalTraining
    {
        // Unique identifier for the physical training session
        [Key]
        [JsonIgnore]
        public int PhysicalTrainingId { get; set; }
 
        // Name of the training session (required)
        [Required(ErrorMessage = "Training name is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Training name must be between 3 and 100 characters long.")]
        public string TrainingName { get; set; }
 
        // Detailed description of the training session
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 1000 characters long.")]
        public string Description { get; set; }
 
        // Name of the trainer conducting the session
        [Required(ErrorMessage = "Trainer name is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Trainer name must be between 3 and 50 characters long.")]
        public string TrainerName { get; set; }
 
        // Location where the training session will be conducted
        [Required(ErrorMessage = "Location is required.")]
        [StringLength(200, MinimumLength = 5, ErrorMessage = "Location must be between 5 and 200 characters long.")]
        public string Location { get; set; }
 
        // Indicates whether the session is conducted indoors or outdoors
        [Required(ErrorMessage = "Please specify if the training is indoor or outdoor.")]
        public bool IsIndoor { get; set; }
 
        // Fee for attending the session (must be non-negative)
        [Required(ErrorMessage = "Fee is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Fee must be a positive value.")]
        public decimal Fee { get; set; }
 
        // Main focus area of the training (e.g., strength, flexibility, endurance)
        [Required(ErrorMessage = "Focus area is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Focus area must be between 3 and 100 characters long.")]
        public string FocusArea { get; set; }
 
        // Physical requirements necessary for participation (e.g., fitness level, equipment)
        [Required(ErrorMessage = "Physical requirements are required.")]
        [StringLength(300, MinimumLength = 5, ErrorMessage = "Physical requirements must be between 5 and 300 characters long.")]
        public string PhysicalRequirements { get; set; }
    }
}
 