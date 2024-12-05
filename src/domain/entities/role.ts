import { User } from "./user";

export interface Role {
    id: string;
    name: string;
    description: string;
    inactivationDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
}
