import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TUser } from '../../types/types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(user: TUser): Promise<{
        id: string;
        email: string;
    }>;
}
export {};
