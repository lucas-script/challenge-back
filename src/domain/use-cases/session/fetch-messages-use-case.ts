import { Message } from "../../entities/message";
import { IFetchSessionMessages } from "../../interfaces/user-cases/session/fetch-session-messages";
import { ISessionRepository } from "../../interfaces/repositories/session-repository";

export class FetchMessages implements IFetchSessionMessages {
    sessionRepository: ISessionRepository;

    constructor(sessionRepository: ISessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute(sessionId: string): Promise<Message[]> {
        const messages = await this.sessionRepository.fetchMessages(sessionId);
        return messages;
    }
}
