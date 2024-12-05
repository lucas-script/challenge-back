import { Message } from "../../../entities/message";

export interface IFetchSessionMessages {
    execute(sessionId: string): Promise<Message[]>;
}
