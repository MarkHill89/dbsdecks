export enum UserAuthStatus {
    WORKING = "working",
    SUCCESS = "success",
    FAILED = "failed",
    IDLE = "IDLE"
}

export enum ForgotPasswordStatus {
    IDLE = "IDLE",
    EMAIL_SENT = "EMAIL SENT"
}

export interface User {
    id: string;
    username: string;
    email: string;
}