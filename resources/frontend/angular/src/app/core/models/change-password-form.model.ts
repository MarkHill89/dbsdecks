import { IChangePasswordForm } from "../interfaces/i-change-password-form";

export class ChangePasswordForm implements IChangePasswordForm{
    public currentPassword: string;
    public newPassword: string;
    public newPasswordMatch: string;
    constructor() {}
}
