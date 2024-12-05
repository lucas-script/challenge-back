import { Session } from "../../../entities/session";

export interface ICreateSessionUseCase {
    execute(): Promise<Session>;
}
