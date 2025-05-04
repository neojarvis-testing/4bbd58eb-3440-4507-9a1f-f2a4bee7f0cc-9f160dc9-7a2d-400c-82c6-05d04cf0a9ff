using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;
 
        // Constructor that takes in ApplicationDbContext
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // Retrieves all feedbacks from the database
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            // Fetching all feedbacks with the associated User details
            return await _context.Feedbacks
                .Include(f => f.User) // Include User details
                .ToListAsync(); // Returns all feedbacks as a list asynchronously
        }
 
        // Retrieves all feedbacks associated with a specific user (by UserId)
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            // Fetching feedbacks filtered by UserId
            return await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .Include(f => f.User) // Include User details
                .ToListAsync(); // Returns the filtered feedbacks asynchronously
        }
 
        // Adds new feedback to the database
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            // Add feedback to the Feedbacks DbSet
            _context.Feedbacks.Add(feedback);
 
            // Save changes asynchronously to the database
            await _context.SaveChangesAsync();
 
            // Return true for successful insertion
            return true;
        }
 
        // Deletes feedback based on feedbackId
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            // Retrieve the feedback with the specified feedbackId
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
 
            // If no feedback is found, return false
            if (feedback == null)
            {
                return false;
            }
 
            // If found, remove the feedback
            _context.Feedbacks.Remove(feedback);
 
            // Save changes asynchronously to the database
            await _context.SaveChangesAsync();
 
            // Return true for successful deletion
            return true;
        }
    }
}