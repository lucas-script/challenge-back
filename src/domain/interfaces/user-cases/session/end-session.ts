import { Session } from "../../../entities/session";

export interface IEndSessionUseCase {
    execute(sessionId: string, endedAt: Date): Promise<Session>;
}
