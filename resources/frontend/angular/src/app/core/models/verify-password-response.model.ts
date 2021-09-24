import { IVerifyPasswordResponse } from "../interfaces/i-verify-password-response";

export class VerifyPasswordResponse implements IVerifyPasswordResponse{
    public valid: boolean;
    constructor() {}
}
