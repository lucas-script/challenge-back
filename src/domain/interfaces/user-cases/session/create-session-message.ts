import { Message } from "../../../entities/message";

export interface ICreateSessionMessageUseCase {
    execute(sessionId: string, messageText: string): Promise<Message>;
}
