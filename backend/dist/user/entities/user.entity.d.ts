export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    role: 'ADMIN' | 'USER';
    createdAt: Date;
    updatedAt: Date;
}
