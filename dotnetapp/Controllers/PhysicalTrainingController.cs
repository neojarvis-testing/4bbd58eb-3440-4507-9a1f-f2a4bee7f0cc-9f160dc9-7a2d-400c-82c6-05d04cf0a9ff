using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using log4net;
using System.Reflection;

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
        [HttpPost]
        public async Task<ActionResult> AddPhysicalTraining([FromBody] PhysicalTraining training)
        {
            log.Info("Attempting to add new physical training.");
            try
            {
                var success = await _physicalTrainingService.AddPhysicalTraining(training);
                if (success)
                {
                    log.Info("Physical training added successfully.");
                    return Ok(new { message = "Physical training added successfully." });  // Success message
                }

                log.Warn("Failed to add physical training.");
                return StatusCode(500, new { message = "Failed to add physical training." });  // Failure message
            }
            catch (Exception ex)
            {
                log.Error($"Error adding physical training: {ex.Message}", ex);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });  // Exception handling
            }
        }

        // Update physical training [Access for Admin only]
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