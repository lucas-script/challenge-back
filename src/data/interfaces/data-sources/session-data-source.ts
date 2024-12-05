import { Session, SessionCreate, SessionUpdate } from "../../../domain/entities/session";
import { Message, MessageCreate, MessageFind } from "../../../domain/entities/message";

export interface ISessionDataSource {
    createSession(payload: SessionCreate): Promise<Session>;
    endSession(id: string, payload: SessionUpdate): Promise<Session>;
    createMessage(sessionId: string, messageText: string): Promise<Message>;
    fetchMessages(sessionId: string): Promise<Message[]>;
}
