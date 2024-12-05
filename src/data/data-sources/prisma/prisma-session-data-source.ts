import { ISessionDataSource } from "../../interfaces/data-sources/session-data-source";
import { IDatabaseWrapper } from "../../interfaces/data-sources/database";
import { Session, SessionCreate, SessionUpdate } from "../../../domain/entities/session";
import { Message, MessageCreate, MessageFind } from "../../../domain/entities/message";

export class PrismaSessionDataSource implements ISessionDataSource {
    private database: IDatabaseWrapper;

    constructor(database: IDatabaseWrapper) {
        this.database = database;
    }

    async createSession(payload: SessionCreate): Promise<Session> {
        return await this.database.session.create(payload);
    }

    async endSession(id: string, payload: SessionUpdate): Promise<Session> {
        return await this.database.session.update(id, payload);
    }

    async createMessage(payload: MessageCreate): Promise<Message> {
        return await this.database.message.create(payload);
    }

    async fetchMessages(sessionId: string): Promise<Message[]> {
        return await this.database.message.findMany({
            where: {
                sessionId,
            },
        });
    }
}