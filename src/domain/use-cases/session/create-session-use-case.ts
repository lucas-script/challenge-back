import { Session } from "../../entities/session";
import { ICreateSessionUseCase } from "../../interfaces/user-cases/session/create-session";
import { ISessionRepository } from "../../interfaces/repositories/session-repository";

export class CreateSession implements ICreateSessionUseCase {
    sessionRepository: ISessionRepository;

    constructor(sessionRepository: ISessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute(): Promise<Session> {
        const session = await this.sessionRepository.createSession();
        return session;
    }
}
