using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/physical-training-request")]
    public class PhysicalTrainingRequestController : ControllerBase
    {
        private readonly PhysicalTrainingRequestService _physicalTrainingRequestService;
 
        public PhysicalTrainingRequestController(PhysicalTrainingRequestService physicalTrainingRequestService)
        {
            _physicalTrainingRequestService = physicalTrainingRequestService;
        }
 
        // 1. Get all physical training requests (Admin access)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetAllPhysicalTrainingRequests()
        {
            try
            {
                var requests = await _physicalTrainingRequestService.GetAllPhysicalTrainingRequests();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
 
        // 2. Get requests by user ID (User access)
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PhysicalTrainingRequest>>> GetPhysicalTrainingRequestsByUserId(int userId)
        {
            try
            {
                var requests = await _physicalTrainingRequestService.GetPhysicalTrainingRequestsByUserId(userId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
 
        // 3. Add a new request (User access)
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTrainingRequest([FromBody] PhysicalTrainingRequest request)
        {
            try
            {
                var result = await _physicalTrainingRequestService.AddPhysicalTrainingRequest(request);
                if (result)
                {
                    return Ok(new { Message = "Physical training request added successfully." });
                }
                return StatusCode(500, new { Message = "Failed to add physical training request." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
 
        // 4. Update request (Admin and User access)
        [HttpPut("{requestId}")]
        public async Task<ActionResult> UpdatePhysicalTrainingRequest(int requestId, [FromBody] PhysicalTrainingRequest request)
        {
            try
            {
                var result = await _physicalTrainingRequestService.UpdatePhysicalTrainingRequest(requestId, request);
                if (result)
                {
                    return Ok(new { Message = "Physical training request updated successfully." });
                }
                return NotFound(new { Message = "Cannot find the request." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
 
        // 5. Delete request (User access)
        [HttpDelete("{requestId}")]
        public async Task<ActionResult> DeletePhysicalTrainingRequest(int requestId)
        {
            try
            {
                var result = await _physicalTrainingRequestService.DeletePhysicalTrainingRequest(requestId);
                if (result)
                {
                    return Ok(new { Message = "Physical training request deleted successfully." });
                }
                return NotFound(new { Message = "Cannot find the request." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }
}
 