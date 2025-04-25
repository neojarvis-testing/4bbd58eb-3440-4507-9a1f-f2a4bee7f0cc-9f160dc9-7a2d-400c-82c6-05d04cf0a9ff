namespace dotnetapp.Models

{

    public class PhysicalTrainingRequest

    {

        public int PhysicalTrainingRequestId { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }

        public int PhysicalTrainingId { get; set; }

        public PhysicalTraining? PhysicalTraining { get; set; }

        public string RequestDate { get; set; }

        public string Status { get; set; }

        public string HealthConditions { get; set; }

        public string FitnessGoals { get; set; }

        public string? Comments { get; set; }

    }

}