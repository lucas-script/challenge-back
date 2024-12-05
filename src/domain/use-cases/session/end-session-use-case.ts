import { Session } from "../../entities/session";
import { IEndSessionUseCase } from "../../interfaces/user-cases/session/end-session";
import { ISessionRepository } from "../../interfaces/repositories/session-repository";

export class EndSession implements IEndSessionUseCase {
    sessionRepository: ISessionRepository;

    constructor(sessionRepository: ISessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute(sessionId: string, endedAt: Date): Promise<Session> {
        const session = await this.sessionRepository.endSession(sessionId, endedAt);
        return session;
    }
}
