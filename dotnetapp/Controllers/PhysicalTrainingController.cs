using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
 
namespace dotnetapp.Controllers
{
    [Route("api/physicalTraining")]  // The controller name resolves to /api/physicalTraining
    [ApiController]
    public class PhysicalTrainingController : ControllerBase
    {
        private readonly PhysicalTrainingService _physicalTrainingService;
 
        // Constructor to inject PhysicalTrainingService
        public PhysicalTrainingController(PhysicalTrainingService physicalTrainingService)
        {
            _physicalTrainingService = physicalTrainingService;
        }
 
        // Get all physical trainings [Access for both Admin and User]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTraining>>> GetAllPhysicalTrainings()
        {
            try
            {
                var trainings = await _physicalTrainingService.GetAllPhysicalTrainings();
                return Ok(trainings);  // Returns all physical training sessions
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
 
        // Get specific physical training by ID [Access for Admin only]
        [HttpGet("{trainingId}")]
        public async Task<ActionResult<PhysicalTraining>> GetPhysicalTrainingById(int trainingId)
        {
            try
            {
                var training = await _physicalTrainingService.GetPhysicalTrainingById(trainingId);
                if (training == null)
                {
                    return NotFound(new { message = "Cannot find any training." });  // Training not found
                }
 
                return Ok(training);  // Return found training
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
 
        // Add new physical training [Access for Admin only]
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTraining([FromBody] PhysicalTraining training)
        {
            try
            {
                var success = await _physicalTrainingService.AddPhysicalTraining(training);
                if (success)
                {
                    return Ok(new { message = "Physical training added successfully." });  // Success message
                }
                return StatusCode(500, new { message = "Failed to add physical training." });  // Failure message
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
 
        // Update physical training [Access for Admin only]
        [HttpPut("{trainingId}")]
        public async Task<ActionResult> UpdatePhysicalTraining(int trainingId, [FromBody] PhysicalTraining training)
        {
            try
            {
                var success = await _physicalTrainingService.UpdatePhysicalTraining(trainingId, training);
                if (success)
                {
                    return Ok(new { message = "Physical training updated successfully." });  // Success message
                }
                return NotFound(new { message = "Cannot find any training." });  // Training not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
 
        // Delete physical training [Access for Admin only]
        [HttpDelete("{trainingId}")]
        public async Task<ActionResult> DeletePhysicalTraining(int trainingId)
        {
            try
            {
                var success = await _physicalTrainingService.DeletePhysicalTraining(trainingId);
                if (success)
                {
                    return Ok(new { message = "Physical training deleted successfully." });  // Success message
                }
                return NotFound(new { message = "Cannot find any training." });  // Training not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
    }
}
 