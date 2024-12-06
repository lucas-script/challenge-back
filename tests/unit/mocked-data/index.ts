import { Session, SessionCreate, SessionStatus } from "../../../src/domain/entities/session";
import { Message } from "../../../src/domain/entities/message";
import { Role } from "../../../src/domain/entities/role";
import { User } from "../../../src/domain/entities/user";

export const roleClientData: Role = {
    id: "efc70f8a-2ced-4258-ab2f-23e6e59a9393",
    name: "Client",
    description: "Client role",
    createdAt: new Date(),
    updatedAt: new Date(),
}

export const roleOperatorData: Role = {
    id: "b1470817-4898-4719-a1f7-419fbeb68d57",
    name: "Operator",
    description: "Operator role",
    createdAt: new Date(),
    updatedAt: new Date(),
}

export const userClientData: User = {
    id: "2f24d544-87dc-431a-9355-c6d53ba1b39c",
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "hashedPassword",
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: roleClientData.id,
}

export const userOperatorData: User = {
    id: "e1764a6c-ac3f-4562-a439-68198cf5ffdf",
    name: "Mary Doe",
    email: "mary.doe@omni.chat",
    password: "hashedPassword",
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: roleOperatorData.id,
}

export const sessionCreationPayloadData: SessionCreate = {
    status: SessionStatus.ACTIVE,
    userId: userClientData.id,
}

export const sessionData: Session = {
    id: "905f27d4-dd0d-4700-9ef3-f22f701957f6",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...sessionCreationPayloadData,
}

export const sessionEndedPayloadData = {
    status: SessionStatus.ENDED,
    endedAt: new Date(),
}

export const sessionEndedData: Session = {
    id: "905f27d4-dd0d-4700-9ef3-f22f701957f6",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userOperatorData.id,
    ...sessionEndedPayloadData,
}

export const messageFromClientData: Message = {
    id: "9e97a007-9551-4715-ada1-3d9cd67ae924",
    message: "Hi there! i need to buy some stuff...",
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionId: sessionData.id,
    userId: userClientData.id,
}

export const messageFromOperatorData: Message = {
    id: "5ed3cd67-6c6f-4620-92a6-b272c0f18429",
    message: "Hello, what's up, how can i help u?",
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionId: sessionData.id,
    userId: userOperatorData.id,
}