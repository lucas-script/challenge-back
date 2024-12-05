import { Message } from "../entities/message";
import { Session } from "../entities/session";
import { ISessionRepository } from "../interfaces/repositories/session-repository";
import { ISessionDataSource } from "../../data/interfaces/data-sources/session-data-source";

export class SessionRepository implements ISessionRepository {
    sessionDataSource: ISessionDataSource;
    
    constructor(sessionDataSource: ISessionDataSource) {
        this.sessionDataSource = sessionDataSource;
    }

    async createSession(): Promise<Session> {
        return await this.sessionDataSource.createSession();
    }

    async endSession(sessionId: string, endedAt: Date): Promise<Session> {
        return await this.sessionDataSource.endSession(sessionId, endedAt);
    }

    async createMessage(sessionId: string, messageText: string): Promise<Message> {
        return await this.sessionDataSource.createMessage(sessionId, messageText)
    }

    async fetchMessages(sessionId: string): Promise<Message[]> {
        return await this.sessionDataSource.fetchMessages(sessionId);
    }
}