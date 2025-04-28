using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
 
namespace dotnetapp.Services
{
    // Service class responsible for managing physical training requests
    public class PhysicalTrainingRequestService
    {
        // Database context instance for interacting with the database
        private readonly ApplicationDbContext _context;
 
        // Constructor to initialize the service with the database context
        public PhysicalTrainingRequestService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // Retrieves all physical training requests, including associated user and training details
        public async Task<IEnumerable<PhysicalTrainingRequest>> GetAllPhysicalTrainingRequests()
        {
            return await _context.PhysicalTrainingRequests
                .Include(r => r.User)               // Include user details
                .Include(r => r.PhysicalTraining)   // Include training details
                .ToListAsync();
        }
 
        // Retrieves all training requests made by a specific user
        public async Task<IEnumerable<PhysicalTrainingRequest>> GetPhysicalTrainingRequestsByUserId(int userId)
        {
            return await _context.PhysicalTrainingRequests
                .Where(r => r.UserId == userId)      // Filter by UserId
                .Include(r => r.User)                // Include user details
                .Include(r => r.PhysicalTraining)    // Include training details
                .ToListAsync();
        }
 
        // Adds a new physical training request
        public async Task<bool> AddPhysicalTrainingRequest(PhysicalTrainingRequest request)
        {
            // Check if the user has already requested the same training session
            var exists = await _context.PhysicalTrainingRequests
                .AnyAsync(r => r.UserId == request.UserId && r.PhysicalTrainingId == request.PhysicalTrainingId);
 
            if (exists)
                throw new PhysicalTrainingException("User already requested this training.");
 
            _context.PhysicalTrainingRequests.Add(request);
            await _context.SaveChangesAsync(); // Save changes to the database
            return true;
        }
 
        // Updates an existing physical training request
        public async Task<bool> UpdatePhysicalTrainingRequest(int requestId, PhysicalTrainingRequest request)
        {
            // Find the existing request by ID
            var existingRequest = await _context.PhysicalTrainingRequests.FindAsync(requestId);
            if (existingRequest == null)
                return false;
 
            // Update properties with the new request data
            existingRequest.RequestDate = request.RequestDate;
            existingRequest.Status = request.Status;
            existingRequest.HealthConditions = request.HealthConditions;
            existingRequest.FitnessGoals = request.FitnessGoals;
            existingRequest.Comments = request.Comments;
 
            await _context.SaveChangesAsync(); // Commit changes to the database
            return true;
        }
 
        // Deletes a physical training request by ID
        public async Task<bool> DeletePhysicalTrainingRequest(int requestId)
        {
            // Find the request by ID
            var request = await _context.PhysicalTrainingRequests.FindAsync(requestId);
            if (request == null)
                return false;
 
            _context.PhysicalTrainingRequests.Remove(request);
            await _context.SaveChangesAsync(); // Remove from database
            return true;
        }
    }
}
 