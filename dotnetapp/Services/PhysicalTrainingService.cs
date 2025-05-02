using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
 
namespace dotnetapp.Services
{
    // Service class to manage physical training operations
    public class PhysicalTrainingService
    {
        private readonly ApplicationDbContext _context;
 
        // Constructor to initialize the service with the database context
        public PhysicalTrainingService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // Retrieves all physical training sessions from the database
        public async Task<IEnumerable<PhysicalTraining>> GetAllPhysicalTrainings()
        {
            return await _context.PhysicalTrainings.ToListAsync();
        }
 
        // Retrieves a specific physical training session by its ID
        public async Task<PhysicalTraining> GetPhysicalTrainingById(int trainingId)
        {
            return await _context.PhysicalTrainings.FindAsync(trainingId);
        }
 
        // Adds a new physical training session to the database
        public async Task<bool> AddPhysicalTraining(PhysicalTraining training)
        {
            // Checks if a training session with the same name already exists
            var exists = await _context.PhysicalTrainings
                .AnyAsync(t => t.TrainingName == training.TrainingName);
 
            if (exists)
                throw new PhysicalTrainingException("Training with the same name already exists.");
 
            _context.PhysicalTrainings.Add(training);
            await _context.SaveChangesAsync();
            return true;
        }
 
        // Updates an existing physical training session
        public async Task<bool> UpdatePhysicalTraining(int trainingId, PhysicalTraining training)
        {
            // Fetches the existing training session by ID
            var existingTraining = await _context.PhysicalTrainings.FindAsync(trainingId);
            if (existingTraining == null)
                return false;
 
            // Checks if another training session has the same name
            var duplicate = await _context.PhysicalTrainings
                .AnyAsync(t => t.TrainingName == training.TrainingName && t.PhysicalTrainingId != trainingId);
 
            if (duplicate)
                throw new PhysicalTrainingException("Training with the same name already exists.");
 
            // Updates the properties of the existing training session
            existingTraining.TrainingName = training.TrainingName;
            existingTraining.Description = training.Description;
            existingTraining.TrainerName = training.TrainerName;
            existingTraining.Location = training.Location;
            existingTraining.IsIndoor = training.IsIndoor;
            existingTraining.Fee = training.Fee;
            existingTraining.FocusArea = training.FocusArea;
            existingTraining.PhysicalRequirements = training.PhysicalRequirements;
 
            await _context.SaveChangesAsync();
            return true;
        }
 
        // Deletes a physical training session by its ID
        public async Task<bool> DeletePhysicalTraining(int trainingId)
        {
            // Retrieves the training session to be deleted
            var training = await _context.PhysicalTrainings.FindAsync(trainingId);
            if (training == null)
                return false;
 
            // Ensures that the training session is not referenced elsewhere before deleting
            var isReferenced = await _context.PhysicalTrainingRequests
                .AnyAsync(r => r.PhysicalTrainingId == trainingId);
 
            if (isReferenced)
                throw new PhysicalTrainingException("Training cannot be deleted as it is referenced in a request.");
 
            _context.PhysicalTrainings.Remove(training);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
 