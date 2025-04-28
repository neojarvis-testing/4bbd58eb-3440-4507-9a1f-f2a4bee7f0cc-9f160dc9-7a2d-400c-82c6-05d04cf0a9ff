using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;
 
        // Constructor injection for the feedback service
        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }
 
        // Retrieves all feedbacks from the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
 
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
 
        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                var result = await _feedbackService.AddFeedback(feedback);
                if (result)
                    return Ok("Feedback added successfully");
                return BadRequest("Failed to add feedback");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
 
        [HttpDelete("{feedbackId}")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var result = await _feedbackService.DeleteFeedback(feedbackId);
                if (result)
                    return Ok("Feedback deleted successfully");
                return NotFound("Cannot find any feedback");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}