export interface PhysicalTrainingRequest {
    PhysicalTrainingRequestId?: number;
    UserId: number;
    PhysicalTrainingId: number;
    RequestDate: string;
    Status: string;
    HealthConditions: string;
    FitnessGoals: string;
    Comments?: string;
}