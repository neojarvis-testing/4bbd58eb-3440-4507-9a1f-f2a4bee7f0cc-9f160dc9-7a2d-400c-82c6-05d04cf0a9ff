import { User } from "./user.model";

export class Feedback {
    FeedbackId?: number;
    User?: User;
    UserId: number;
    FeedbackText: string;
    Date: Date;
}