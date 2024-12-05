import { Message } from "../../../../../src/domain/entities/message";
import { Session } from "../../../../../src/domain/entities/session";
import { ISessionRepository } from "../../../../../src/domain/interfaces/repositories/session-repository";
import { CreateSession } from "../../../../../src/domain/use-cases/session/create-session-use-case";
import { sessionData } from "../../../mocked-data";

describe("Create session use case", () => {

    class MockSessionRepository implements ISessionRepository {
        createSession(): Promise<Session> {
            throw new Error("Not implemented");
        }
        endSession(sessionId: string): Promise<Session> {
            throw new Error("Not implemented");
        }
        createMessage(sessionId: string, messageText: string): Promise<Message> {
            throw new Error("Not implemented");
        }
        fetchMessages(sessionId: string): Promise<Message[]> {
            throw new Error("Not implemented");
        }
    }

    let mockSessionRepository: ISessionRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockSessionRepository = new MockSessionRepository();
    });

    it("should create and return a new session", async () => {
        const expectedSession: Session = sessionData;
        jest.spyOn(mockSessionRepository, "createSession").mockImplementation(() => Promise.resolve(expectedSession));
        const createSessionCaseUse = new CreateSession(mockSessionRepository);
        
        const session = await createSessionCaseUse.execute();

        expect(session).toStrictEqual(expectedSession);
    });
});