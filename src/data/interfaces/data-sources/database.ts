import { Session, SessionCreate, SessionUpdate } from "../../../domain/entities/session";
import { Message, MessageCreate, MessageFind } from "../../../domain/entities/message";

export interface IDatabaseWrapper {
    session: {
        create(payload: SessionCreate): Promise<Session>;
        update(id: string, payload: SessionUpdate): Promise<Session>;
    },
    message: {
        create(payload: MessageCreate): Promise<Message>;
        findMany(query: MessageFind): Promise<Message[]>;
    },
}
