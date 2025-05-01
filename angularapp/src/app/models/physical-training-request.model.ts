import { PhysicalTraining } from "./physical-training.model";
import { User } from "./user.model";

export interface PhysicalTrainingRequest {
    PhysicalTrainingRequestId?: number;
    UserId: number;
    User?: User;
    PhysicalTrainingId: number;
    PhysicalTraining?: PhysicalTraining;
    RequestDate: string;
    Status: string;
    HealthConditions: string;
    FitnessGoals: string;
    Comments?: string;
}