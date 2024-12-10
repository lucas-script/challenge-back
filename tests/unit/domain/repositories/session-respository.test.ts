import { ISessionDataSource } from "../../../../../src/data/interfaces/data-sources/session-data-source";
import { Message } from "../../../../../src/domain/entities/message";
import { Session } from "../../../../../src/domain/entities/session";
import { SessionRepository } from "../../../../../src/domain/respositories/session-repository";
import { sessionData, messageFromClientData, messageFromOperatorData } from "../../../mocked-data";

class MockSessionDataSource implements ISessionDataSource {
    createSession(): Promise<Session> {
        throw new Error("Method not implemented");
    }
    endSession(sessionId: string): Promise<Session> {
        throw new Error("Method not implemented");
    }
    createMessage(sessionId: string, messageText: string): Promise<Message> {
        throw new Error("Method not implemented");
    }
    fetchMessages(sessionId: string): Promise<Message[]> {
        throw new Error("Method not implemented");
    }
}

describe("Session Repository", () => {
    let mockSessionDataSource: ISessionDataSource;
    let sessionRepository: SessionRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockSessionDataSource = new MockSessionDataSource();
        sessionRepository = new SessionRepository(mockSessionDataSource);
    });

    describe("createSession", () => {
        it("should create a new session", async () => {
            const expectedData: Session = sessionData;
            jest.spyOn(mockSessionDataSource, "createSession").mockImplementation(() => Promise.resolve(expectedData));

            const session = await sessionRepository.createSession();
            
            expect(session).toStrictEqual(expectedData);
        });
    });

    describe("endSession", () => {
        it("should end a existing session", async () => {
            const endedAt = new Date();
            const expectedData: Session = {
                ...sessionData,
                endedAt,
            }
            jest.spyOn(mockSessionDataSource, "endSession").mockImplementation(() => Promise.resolve(expectedData));

            const session = await sessionRepository.endSession(expectedData.id, endedAt);

            expect(session).toStrictEqual(expectedData);
            expect(mockSessionDataSource.endSession).toHaveBeenCalledTimes(1);
            expect(mockSessionDataSource.endSession).toHaveBeenCalledWith(expectedData.id, endedAt);
        });
    });

    describe("createMessage", () => {
        it("should create a new message in a session", async () => {
            const expectedData = messageFromClientData;
            jest.spyOn(mockSessionDataSource, "createMessage").mockImplementation(() => Promise.resolve(expectedData));

            const message = await sessionRepository.createMessage(expectedData.sessionId, expectedData.message);

            expect(message).toStrictEqual(expectedData);
            expect(mockSessionDataSource.createMessage).toHaveBeenCalledTimes(1);
            expect(mockSessionDataSource.createMessage).toHaveBeenCalledWith(expectedData.sessionId, expectedData.message);
        });
    });

    describe("fetchMessages", () => {
        it("should fetch all messages from a session", async () => {
            const expectedData: Message[] = [
                messageFromClientData,
                messageFromOperatorData,
            ];
            jest.spyOn(mockSessionDataSource, "fetchMessages").mockImplementation(() => Promise.resolve(expectedData));

            const messages = await sessionRepository.fetchMessages(expectedData[0].sessionId);

            expect(messages).toStrictEqual(expectedData);
            expect(mockSessionDataSource.fetchMessages).toHaveBeenCalledTimes(1);
            expect(mockSessionDataSource.fetchMessages).toHaveBeenCalledWith(expectedData[0].sessionId);
        });
    });
});
