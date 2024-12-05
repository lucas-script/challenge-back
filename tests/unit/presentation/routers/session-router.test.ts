import request from "supertest";
import { Session } from "../../../../src/domain/entities/session";
import { Message } from "../../../../src/domain/entities/message";
import { ICreateSessionUseCase } from "../../../../src/domain/interfaces/user-cases/session/create-session";
import { IEndSessionUseCase } from "../../../../src/domain/interfaces/user-cases/session/end-session";
import { ICreateSessionMessageUseCase } from "../../../../src/domain/interfaces/user-cases/session/create-session-message";
import { IFetchSessionMessages } from "../../../../src/domain/interfaces/user-cases/session/fetch-session-messages";
import SessionRouter from "../../../../src/presentation/routers/session-router";
import server from "../../../../src/frameworks/express/server";
import { 
    sessionData,
    messageFromClientData, 
    messageFromOperatorData, 
} from "../../mocked-data";

class MockCreateSessionUseCase implements ICreateSessionUseCase {
    execute(): Promise<Session> {
        throw new Error("Not implemented");
    }
}

class MockEndSessionUseCase implements IEndSessionUseCase {
    execute(sessionId: string, endedAt: Date): Promise<Session> {
        throw new Error("Not implemented");
    }
}

class MockCreateSessionMessageUseCase implements ICreateSessionMessageUseCase {
    execute(sessionId: string, message: string): Promise<Message> {
        throw new Error("Not implemented");
    }
}

class MockFetchSessionMessages implements IFetchSessionMessages {
    execute(sessionId: string): Promise<Message[]> {
        throw new Error("Not implemented");
    }
}

describe("Session router", () => {
    let mockCreateSessionUseCase: ICreateSessionUseCase;
    let mockEndSessionUseCase: IEndSessionUseCase;
    let mockCreateSessionMessageUseCase: ICreateSessionMessageUseCase;
    let mockFetchSessionMessages: IFetchSessionMessages;

    beforeAll(() => {
        mockCreateSessionUseCase = new MockCreateSessionUseCase();
        mockEndSessionUseCase = new MockEndSessionUseCase();
        mockCreateSessionMessageUseCase = new MockCreateSessionMessageUseCase();
        mockFetchSessionMessages = new MockFetchSessionMessages();
        server.use("/chat/sessions", SessionRouter(mockCreateSessionUseCase, mockEndSessionUseCase, mockCreateSessionMessageUseCase, mockFetchSessionMessages))
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /", () => {
        it("should create a new session and return status 200", async () => {
            const expectedData: Session = sessionData;
            const expectedDataJSON = {
                ...expectedData,
                createdAt: expectedData.createdAt.toJSON(),
                updatedAt: expectedData.updatedAt.toJSON(),
            }
            jest.spyOn(mockCreateSessionUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).post("/chat/sessions");

            expect(response.status).toBe(200);
            expect(mockCreateSessionUseCase.execute).toHaveBeenCalledTimes(1);
            expect(response.body).toStrictEqual(expectedDataJSON);
        });

        it("should return status 500 when a error occurs", async () => {
            jest.spyOn(mockCreateSessionUseCase, "execute").mockImplementation(() => Promise.reject(new Error("Some wild error appears")));
            
            const response = await request(server).post("/chat/sessions");

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ 
                message: "An error occurred when creating the session" ,
            });
        });
    });

    describe("PATCH /:sessionId/end", () => {
        it("should finish a specific session", async () => {
            const expectedData: Session = {
                ...sessionData,
                endedAt: new Date(),
            }
            const expectedDataJSON = {
                ...expectedData,
                createdAt: expectedData.createdAt.toJSON(),
                updatedAt: expectedData.updatedAt.toJSON(),
                endedAt: expectedData.endedAt?.toJSON(),
            }
            jest.spyOn(mockEndSessionUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).patch(`/chat/sessions/${expectedData.id}/end`);

            expect(response.status).toBe(200);
            expect(mockEndSessionUseCase.execute).toHaveBeenCalledTimes(1);
            expect(response.body).toStrictEqual(expectedDataJSON);
        });

        it("should return status 500 when a error occurs", async () => {
            const sessionId = sessionData.id;
            jest.spyOn(mockEndSessionUseCase, "execute").mockImplementation(() => Promise.reject(new Error("Some wild error appears")));
            
            const response = await request(server).patch(`/chat/sessions/${sessionId}/end`);

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ 
                message: "An error occurred when ending the session" ,
            });
        });
    });

    describe("POST /chat/sessions/:sessionId/messages", () => {
        it.each([
            { value: messageFromClientData },
            { value: messageFromOperatorData },
        ])("should create a message in a session as a $value", async (message) => {
            const expectedData: Message = message.value;
            const expectedDataJSON = {
                ...expectedData,
                createdAt: expectedData.createdAt.toJSON(),
                updatedAt: expectedData.updatedAt.toJSON(),
            }
            jest.spyOn(mockCreateSessionMessageUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).post(`/chat/sessions/${expectedData.id}/messages`)

            expect(response.status).toBe(200);
            expect(mockCreateSessionMessageUseCase.execute).toHaveBeenCalledTimes(1);
            expect(response.body).toStrictEqual(expectedDataJSON);
        });

        it("should return status 500 when a error occurs", async () => {
            const sessionId = sessionData.id;
            jest.spyOn(mockCreateSessionMessageUseCase, "execute").mockImplementation(() => Promise.reject(new Error("Some wild error appears")));
            
            const response = await request(server).post(`/chat/sessions/${sessionId}/messages`);

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ 
                message: "An error occurred when creating the message",
            });
        });
    });

    describe("GET /chat/sessions/:sessionId/messages", () => {
        it("should fetch all messages from a session", async () => {
            const sessionId = sessionData.id;
            const expectedData: Message[] = [
                messageFromClientData,
                messageFromOperatorData,
            ];
            const expectedDataJSON = expectedData.map(m => ({
                ...m,
                createdAt: m.createdAt.toJSON(),
                updatedAt: m.updatedAt.toJSON(),
            }));
            jest.spyOn(mockFetchSessionMessages, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).get(`/chat/sessions/${sessionId}/messages`);

            expect(mockFetchSessionMessages.execute).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(expectedDataJSON);
        });

        it("should return status 500 when a error occurs", async () => {
            const sessionId = sessionData.id;
            jest.spyOn(mockFetchSessionMessages, "execute").mockImplementation(() => Promise.reject(new Error("Some wild error appears")));
            
            const response = await request(server).get(`/chat/sessions/${sessionId}/messages`);

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ 
                message: "An error occurred when fetching the messages",
            });
        });
    });
});