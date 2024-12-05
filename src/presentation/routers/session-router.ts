import express, { Request, Response, NextFunction } from "express";
import { ICreateSessionUseCase } from "../../domain/interfaces/user-cases/session/create-session";
import { ICreateSessionMessageUseCase } from "../../domain/interfaces/user-cases/session/create-session-message";
import { IFetchSessionMessages } from "../../domain/interfaces/user-cases/session/fetch-session-messages";
import { IEndSessionUseCase } from "../../domain/interfaces/user-cases/session/end-session";
import { Session } from "../../domain/entities/session";
import { Message } from "../../domain/entities/message";

export default function SessionRouter(
    createSessionUseCase: ICreateSessionUseCase,
    endSessionUseCase: IEndSessionUseCase,
    createSessionMessageUseCase: ICreateSessionMessageUseCase,
    fetchSessionMessagesUseCase: IFetchSessionMessages,
) {
    const router = express.Router();

    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session: Session = await createSessionUseCase.execute();
            res.send(session);
        } catch (error) {
            res
                .status(500)
                .send({
                    message: "An error occurred when creating the session",
                });
        }
    });

    router.patch("/:sessionId/end", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sessionId } = req.params;
            const session: Session = await endSessionUseCase.execute(sessionId, new Date());
            res.send(session);
        } catch (error) {
            res
                .status(500)
                .send({
                    message: "An error occurred when ending the session",
                });
        }
    });

    router.post("/:sessionId/messages", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sessionId } = req.params;
            const { message } = req.body;
            const sessionMessage: Message = await createSessionMessageUseCase.execute(sessionId, message);
            res.send(sessionMessage);
        } catch (error) {
            res
                .status(500)
                .send({
                    message: "An error occurred when creating the message",
                });
        }
    });

    router.get("/:sessionId/messages", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sessionId } = req.params;
            const sessionMessages: Message[] = await fetchSessionMessagesUseCase.execute(sessionId);
            res.send(sessionMessages);
        } catch (error) {
            res
                .status(500)
                .send({
                    message: "An error occurred when fetching the messages",
                });
        }
    });

    return router;
}
