import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TUser } from '../types/types';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../user/entities/user.entity").User>;
    login(user: TUser): Promise<{
        id: string;
        email: string;
        role: "ADMIN" | "USER";
        token: string;
    }>;
}
