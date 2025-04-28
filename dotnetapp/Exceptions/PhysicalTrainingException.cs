using System;

namespace dotnetapp.Exceptions
{
    // Custom exception class for handling errors related to physical training operations
    public class PhysicalTrainingException : Exception
    {
        // Constructor that initializes the exception with a custom message
        public PhysicalTrainingException(string message) : base(message) { }
    }
}