import { PrismaSessionDataSource } from "../../../../../src/data/data-sources/prisma/prisma-session-data-source";
import { IDatabaseWrapper } from "../../../../../src/data/interfaces/data-sources/database";
import { Session } from "../../../../../src/domain/entities/session";
import { Message } from "../../../../../src/domain/entities/message";
import { 
    messageFromClientData, 
    messageFromOperatorData, 
    sessionCreationPayloadData,
    sessionData, 
    sessionEndedPayloadData,
    sessionEndedData 
} from "../../../mocked-data";

describe("Prisma datasource", () => {
    let mockDatabase: IDatabaseWrapper;

    beforeAll(() => {
        mockDatabase = {
            session: {
                create: jest.fn(),
                update: jest.fn(),
            },
            message: {
                create: jest.fn(),
                findMany: jest.fn(),
            },
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("session.create", async () => {
        const expectedData: Session = sessionData;
        const datasource = new PrismaSessionDataSource(mockDatabase);
        jest.spyOn(mockDatabase.session, "create").mockImplementation(() => Promise.resolve(expectedData));

        const session = await datasource.createSession(sessionCreationPayloadData);

        expect(mockDatabase.session.create).toHaveBeenCalledWith({ data: {} });
        expect(session).toStrictEqual(expectedData);
    });

    it("session.endSession", async () => {
        const expectedData: Session = sessionEndedData;
        const datasource = new PrismaSessionDataSource(mockDatabase);
        jest.spyOn(mockDatabase.session, "update").mockImplementation(() => Promise.resolve(expectedData));

        if (expectedData.endedAt) {
            const session = await datasource.endSession(expectedData.id, sessionEndedPayloadData);
    
            expect(mockDatabase.session.update).toHaveBeenCalledWith({
                where: {
                    id: expectedData.id,
                },
                data: {
                    status: sessionEndedData.status,
                    endedAt: sessionEndedData.endedAt,
                },
            });
            expect(session).toStrictEqual(expectedData);
        }
    });

    it("session.createMessage", async () => {
        const expectedData: Message = messageFromClientData;
        const datasource = new PrismaSessionDataSource(mockDatabase);
        jest.spyOn(mockDatabase.message, "create").mockImplementation(() => Promise.resolve(expectedData));

        const message = await datasource.createMessage(expectedData.sessionId, expectedData.message);

        expect(mockDatabase.message.create).toHaveBeenCalledTimes(1);
        expect(mockDatabase.message.create).toHaveBeenCalledWith({
            data: {
                sessionId: expectedData.sessionId,
                message: expectedData.message,
            },
        });
        expect(message).toStrictEqual(expectedData);
    });

    test("session.fetchMessages", async () => {
        const expectedData: Message[] = [
            messageFromClientData,
            messageFromOperatorData,
        ];
        const datasource = new PrismaSessionDataSource(mockDatabase);
        jest.spyOn(mockDatabase.message, 'findMany').mockImplementation(() => Promise.resolve(expectedData));
        
        const messages = await datasource.fetchMessages(expectedData[0].sessionId);

        expect(mockDatabase.message.findMany).toHaveBeenCalledTimes(1);
        expect(mockDatabase.message.findMany).toHaveBeenCalledWith({
            where: {
                sessionId: expectedData[0].sessionId,
            },
        });
        expect(messages).toBe(expectedData);
    });
});