import { SessionStatus } from "@prisma/client";
import { IDatabaseWrapper } from "../../interfaces/data-sources/database";
import prisma from "./prisma-client";
import { Session } from "../../../domain/entities/session";

export const database: IDatabaseWrapper = {
    session: {
        async create() {
            const session = await prisma.session.create({ 
                data: { 
                    status: SessionStatus.ACTIVE,
                },
                select: {
                    id: true,
                    status: true,
                    endedAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return session as Session;
        },
        async update(id: string, payload: Omit<Session, "id">) {
            const session = await prisma.session.update({
                where: {
                    id,
                },
                data: {
                    status: payload.status,
                    endedAt: payload.endedAt,
                },
                select: {
                    id: true,
                    status: true,
                    endedAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return session as Session;
        }
    },
    message: {
        async createInSession(sessionId: string, userId: string, body: string): Promise<Message> {
            const message = await prisma.message.create({
                data: {
                    message: body,
                    sessionId,
                    userId,
                },
                select: {

                }
            })
        }
    }
}