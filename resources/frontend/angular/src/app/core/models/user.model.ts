import { IUser } from "../interfaces/i-user";

export class User implements IUser{
    firstName: string;
    lastName: string;
    emailAddress: string;
    userName: string;
    constructor() { }
}
