using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using log4net;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    // API Controller for handling feedback-related requests
    [ApiController] // Marks this class as an API controller, providing automatic behavior such as model binding and validation.
    [Route("api/feedback")] // Defines the route prefix for all endpoints in this controller.
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService; // Dependency injection for managing feedback operations.

        // Initializing Log4Net logger for logging purposes.
        private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod()?.DeclaringType);

        // Constructor to initialize the feedback service.
        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // HTTP GET method to retrieve all feedback records from the database.
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet] // Defines an HTTP GET endpoint to fetch all feedbacks.
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            log.Info("Fetching all feedback records."); // Logs an informational message indicating the start of feedback retrieval.

            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks(); // Calls the service to fetch all feedback entries asynchronously.
                log.Info($"Successfully retrieved {feedbacks.Count()} feedback records."); // Logs the successful retrieval of feedback count.
                return Ok(feedbacks); // Returns the list of feedbacks with a 200 OK HTTP response.
            }
            catch (Exception ex)
            {
                log.Error($"Error fetching feedback records: {ex.Message}", ex); // Logs the error message in case of an exception.
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); // Returns an internal server error response.
            }
        }

        // HTTP GET method to retrieve feedback records for a specific user ID.
        [Authorize(Roles = UserRoles.User)]
        [HttpGet("user/{userId}")] // Defines an endpoint to fetch feedbacks by user ID.
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            log.Info($"Fetching feedback records for User ID: {userId}"); // Logs the requested user ID.

            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId); // Calls the service to fetch feedbacks by user ID.
                log.Info($"Successfully retrieved feedback for User ID: {userId}"); // Logs the successful retrieval.
                return Ok(feedbacks); // Returns the retrieved feedback records with a 200 OK response.
            }
            catch (Exception ex)
            {
                log.Error($"Error fetching feedback for User ID {userId}: {ex.Message}", ex); // Logs the exception if an error occurs.
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); // Returns an internal server error response.
            }
        }

        // HTTP POST method to add new feedback entry.
        [Authorize(Roles = UserRoles.User)]
        [HttpPost] // Defines an HTTP POST endpoint for adding feedbacks.
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback) // Accepts feedback data from the request body.
        {
            log.Info("Attempting to add new feedback."); // Logs the action of adding feedback.

            try
            {
                var result = await _feedbackService.AddFeedback(feedback); // Calls the service to add feedback asynchronously.
                if (result)
                {
                    log.Info("Feedback added successfully."); // Logs success message.
                    return Ok("Feedback added successfully"); // Returns a 200 OK response.
                }

                log.Warn("Failed to add feedback."); // Logs warning message if feedback creation fails.
                return BadRequest("Failed to add feedback"); // Returns a 400 Bad Request response.
            }
            catch (Exception ex)
            {
                log.Error($"Error adding feedback: {ex.Message}", ex); // Logs the exception if an error occurs.
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); // Returns an internal server error response.
            }
        }

        // HTTP DELETE method to remove a feedback entry by feedback ID.
        [Authorize(Roles = UserRoles.User)]
        [HttpDelete("{feedbackId}")] // Defines an endpoint to delete feedback by ID.
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            log.Info($"Attempting to delete feedback ID: {feedbackId}"); // Logs the ID of feedback being deleted.

            try
            {
                var result = await _feedbackService.DeleteFeedback(feedbackId); // Calls the service to delete feedback asynchronously.
                if (result)
                {
                    log.Info($"Feedback ID {feedbackId} deleted successfully."); // Logs success message.
                    return Ok("Feedback deleted successfully"); // Returns a 200 OK response.
                }

                log.Warn($"Cannot find feedback ID {feedbackId}"); // Logs a warning if feedback ID does not exist.
                return NotFound("Cannot find any feedback"); // Returns a 404 Not Found response.
            }
            catch (Exception ex)
            {
                log.Error($"Error deleting feedback ID {feedbackId}: {ex.Message}", ex); // Logs exception if an error occurs.
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); // Returns an internal server error response.
            }
        }
    }
}