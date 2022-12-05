export interface User {
    id?: string;
    username: string;
    email?: string;
}

export interface UserState {
    user : User;
    token: string | null;
    error: string | null;
    status: 'authenticated' | 'loading' | 'error' | 'unauthenicated'
}
