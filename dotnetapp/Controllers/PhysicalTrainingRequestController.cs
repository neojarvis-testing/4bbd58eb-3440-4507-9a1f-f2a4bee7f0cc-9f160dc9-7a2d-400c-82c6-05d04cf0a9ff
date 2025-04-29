using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using log4net;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    // Specifies that this class is an API controller that handles HTTP requests
    [ApiController]
    // Defines the base route for accessing this controller's endpoints
    [Route("api/physical-training-request")]
    public class PhysicalTrainingRequestController : ControllerBase
    {
        // Private field to hold the reference to the service layer handling business logic
        private readonly PhysicalTrainingRequestService _physicalTrainingRequestService;

        // Initializing Log4Net logger for logging purposes to track application events
        private static readonly ILog log = LogManager.GetLogger(typeof(PhysicalTrainingRequestController));

        // Constructor for dependency injection to ensure the service is available for controller methods
        public PhysicalTrainingRequestController(PhysicalTrainingRequestService physicalTrainingRequestService)
        {
            _physicalTrainingRequestService = physicalTrainingRequestService;
        }

        // 1. Get all physical training requests (Admin access)
        // Retrieves all physical training requests from the system
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetAllPhysicalTrainingRequests()
        {
            log.Info("Fetching all physical training requests.");
            try
            {
                // Calls the service method to fetch all physical training requests asynchronously
                var requests = await _physicalTrainingRequestService.GetAllPhysicalTrainingRequests();
                log.Info($"Successfully retrieved {requests.Count()} physical training requests.");
                
                // Returns HTTP 200 status along with the list of requests
                return Ok(requests);
            }
            catch (Exception ex)
            {
                // Logs any errors encountered while processing the request
                log.Error($"Error fetching physical training requests: {ex.Message}", ex);
                
                // Returns HTTP 500 Internal Server Error along with the exception message
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 2. Get requests by user ID (User access)
        // Retrieves physical training requests associated with a specific user
        [Authorize(Roles = UserRoles.User)]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetPhysicalTrainingRequestsByUserId(int userId)
        {
            log.Info($"Fetching physical training requests for User ID: {userId}");
            try
            {
                // Calls the service method to fetch requests for the specified user ID
                var requests = await _physicalTrainingRequestService.GetPhysicalTrainingRequestsByUserId(userId);
                log.Info($"Successfully retrieved requests for User ID: {userId}");
                
                // Returns HTTP 200 status along with the user's training requests
                return Ok(requests);
            }
            catch (Exception ex)
            {
                log.Error($"Error fetching physical training requests for User ID {userId}: {ex.Message}", ex);
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 3. Add a new request (User access)
        // Allows users to submit a new physical training request
        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTrainingRequest([FromBody] PhysicalTrainingRequest request)
        {
            log.Info("Attempting to add a new physical training request.");
            try
            {
                // Calls the service method to add the new request asynchronously
                var result = await _physicalTrainingRequestService.AddPhysicalTrainingRequest(request);
                if (result)
                {
                    log.Info("Physical training request added successfully.");
                    return Ok(new { Message = "Physical training request added successfully." });
                }

                log.Warn("Failed to add physical training request.");
                return StatusCode(500, new { Message = "Failed to add physical training request." });
            }
            catch (Exception ex)
            {
                log.Error($"Error adding physical training request: {ex.Message}", ex);
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 4. Update request (Admin and User access)
        // Allows an admin or user to update an existing physical training request
        [Authorize]
        [HttpPut("{requestId}")]
        public async Task<ActionResult> UpdatePhysicalTrainingRequest(int requestId, [FromBody] PhysicalTrainingRequest request)
        {
            log.Info($"Attempting to update physical training request ID: {requestId}");
            try
            {
                // Calls the service method to update the request identified by the requestId
                var result = await _physicalTrainingRequestService.UpdatePhysicalTrainingRequest(requestId, request);
                if (result)
                {
                    log.Info($"Physical training request updated successfully for ID: {requestId}");
                    return Ok(new { Message = "Physical training request updated successfully." });
                }

                log.Warn($"Cannot find physical training request ID: {requestId}");
                return NotFound(new { Message = "Cannot find the request." });
            }
            catch (Exception ex)
            {
                log.Error($"Error updating physical training request ID {requestId}: {ex.Message}", ex);
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 5. Delete request (User access)
        // Allows users to delete an existing physical training request
        [Authorize(Roles = UserRoles.User)]
        [HttpDelete("{requestId}")]
        public async Task<ActionResult> DeletePhysicalTrainingRequest(int requestId)
        {
            log.Info($"Attempting to delete physical training request ID: {requestId}");
            try
            {
                // Calls the service method to delete the request identified by the requestId
                var result = await _physicalTrainingRequestService.DeletePhysicalTrainingRequest(requestId);
                if (result)
                {
                    log.Info($"Physical training request ID {requestId} deleted successfully.");
                    return Ok(new { Message = "Physical training request deleted successfully." });
                }

                log.Warn($"Cannot find physical training request ID: {requestId} to delete.");
                return NotFound(new { Message = "Cannot find the request." });
            }
            catch (Exception ex)
            {
                log.Error($"Error deleting physical training request ID {requestId}: {ex.Message}", ex);
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }
}