import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        id: string;
        email: string;
        role: "ADMIN" | "USER";
        token: string;
    }>;
    getProfile(req: any): any;
}
