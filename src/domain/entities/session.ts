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

export type SessionCreatePayload = Omit<Session, "id" | "status" | "createdAt" | "updatedAt" | "messages">;

export type SessionUpdatePayload = Omit<Partial<Session>, "id" | "createdAt" | "updatedAt" | "createdBy" | "userId" | "messages">;

export type SessionEndPayload = Required<Pick<Session, "status" | "endedAt">>;
