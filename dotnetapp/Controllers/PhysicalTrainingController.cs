using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using log4net;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace dotnetapp.Controllers
{
    [Route("api/physicalTraining")]  // The controller name resolves to /api/physicalTraining
    [ApiController]
    public class PhysicalTrainingController : ControllerBase
    {
        private readonly PhysicalTrainingService _physicalTrainingService;

        // Initializing Log4Net logger for logging purposes.
        private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod()?.DeclaringType);

        // Constructor to inject PhysicalTrainingService
        public PhysicalTrainingController(PhysicalTrainingService physicalTrainingService)
        {
            _physicalTrainingService = physicalTrainingService;
        }

        // Get all physical trainings [Access for both Admin and User]
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalTraining>>> GetAllPhysicalTrainings()
        {
            log.Info("Fetching all physical training records.");
            try
            {
                var trainings = await _physicalTrainingService.GetAllPhysicalTrainings();
                log.Info($"Successfully retrieved {trainings.Count()} physical training records.");
                return Ok(trainings);  // Returns all physical training sessions
            }
            catch (Exception ex)
            {
                log.Error($"Error fetching physical training records: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }

        // Get specific physical training by ID [Access for Admin only]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("{trainingId}")]
        public async Task<ActionResult<PhysicalTraining>> GetPhysicalTrainingById(int trainingId)
        {
            log.Info($"Fetching physical training record for ID: {trainingId}");
            try
            {
                var training = await _physicalTrainingService.GetPhysicalTrainingById(trainingId);
                if (training == null)
                {
                    log.Warn($"No physical training found for ID: {trainingId}");
                    return NotFound(new { message = "Cannot find any training." });  // Training not found
                }

                log.Info($"Successfully retrieved training for ID: {trainingId}");
                return Ok(training);  // Return found training
            }
            catch (Exception ex)
            {
                log.Error($"Error fetching physical training for ID {trainingId}: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }

        // Add new physical training [Access for Admin only]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTraining([FromBody] PhysicalTraining training)
        {
            log.Info("Attempting to add new physical training.");

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid training data." });
            }

            // Check for Authorization Header
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                log.Warn("Missing or invalid Authorization header.");
                return Unauthorized(new { message = "Authorization token is required." });
            }
            
            try
            {
                // Log incoming request data for debugging
                log.Info($"Received Training Request: {JsonConvert.SerializeObject(training)}");

                // Ensure training object is valid
                if (training == null)
                {
                    log.Warn("Invalid training payload received.");
                    return BadRequest(new { message = "Invalid training data." });
                }

                // Call service to add physical training
                var success = await _physicalTrainingService.AddPhysicalTraining(training);
                if (success)
                {
                    log.Info("Physical training added successfully.");
                    return Ok(new { message = "Physical training added successfully." });
                }

                log.Warn("Failed to add physical training.");
                return StatusCode(500, new { message = "Failed to add physical training." });
            }
            catch (Exception ex)
            {
                log.Error($"Error adding physical training: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        // Update physical training [Access for Admin only]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{trainingId}")]
        public async Task<ActionResult> UpdatePhysicalTraining(int trainingId, [FromBody] PhysicalTraining training)
        {
            log.Info($"Attempting to update physical training for ID: {trainingId}");
            try
            {
                var success = await _physicalTrainingService.UpdatePhysicalTraining(trainingId, training);
                if (success)
                {
                    log.Info($"Physical training updated successfully for ID: {trainingId}");
                    return Ok(new { message = "Physical training updated successfully." });  // Success message
                }

                log.Warn($"Cannot find physical training ID: {trainingId} to update.");
                return NotFound(new { message = "Cannot find any training." });  // Training not found
            }
            catch (Exception ex)
            {
                log.Error($"Error updating physical training ID {trainingId}: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }

        // Delete physical training [Access for Admin only]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{trainingId}")]
        public async Task<ActionResult> DeletePhysicalTraining(int trainingId)
        {
            log.Info($"Attempting to delete physical training ID: {trainingId}");
            try
            {
                var success = await _physicalTrainingService.DeletePhysicalTraining(trainingId);
                if (success)
                {
                    log.Info($"Physical training ID {trainingId} deleted successfully.");
                    return Ok(new { message = "Physical training deleted successfully." });  // Success message
                }

                log.Warn($"Cannot find physical training ID: {trainingId} to delete.");
                return NotFound(new { message = "Cannot find any training." });  // Training not found
            }
            catch (Exception ex)
            {
                log.Error($"Error deleting physical training ID {trainingId}: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }
    }
}