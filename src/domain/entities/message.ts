import { Session } from "./session";
import { User } from "./user";

export interface Message {
    id: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    session?: Session;
    sessionId: string
    user?: User;
    userId: string;
}

export type MessageCreate = Omit<Partial<Message>, "id" | "createdAt" | "updatedAt" | "session" | "user">;

export type MessageFind = Omit<MessageCreate, "message" | "userId">;
