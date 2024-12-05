import { Message } from "./message";
import { Role } from "./role";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    inactivationDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    role?: Role;
    roleId: string;
    messages?: Message[];
}