import { Session } from "../../entities/session";
import { Message } from "../../entities/message";

export interface ISessionRepository {
    createSession(): Promise<Session>;
    endSession(sessionId: string, endedAt: Date): Promise<Session>;
    createMessage(sessionId: string, messageText: string): Promise<Message>;
    fetchMessages(sessionId: string): Promise<Message[]>;
}
