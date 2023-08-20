export interface User {
    _id: number;
    email: string;
    name: string;
    isActive: boolean;
    roles: string[];
}