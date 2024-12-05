import { Message } from "../../entities/message";
import { ICreateSessionMessageUseCase } from "../../interfaces/user-cases/session/create-session-message";
import { ISessionRepository } from "../../interfaces/repositories/session-repository";

export class CreateSessionMessage implements ICreateSessionMessageUseCase {
    sessionRepository: ISessionRepository;

    constructor(sessionRepository: ISessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute(sessionId: string, messageText: string): Promise<Message> {
        const message = await this.sessionRepository.createMessage(sessionId, messageText);
        return message;
    }
}
