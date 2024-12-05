import { Message } from "./message";
import { User } from "./user";

export enum SessionStatus {
    ACTIVE = "ACTIVE",
    ENDED = "ENDED",
}

export interface Session {
    id: string;
    status: SessionStatus;
    endedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: User;
    userId: string;
    messages?: Message[];
}

export type SessionCreate = Omit<Session, "id" | "createdAt" | "updatedAt" | "messages">;

export type SessionUpdate = Omit<Partial<SessionCreate>, "createdBy" | "userId">;
