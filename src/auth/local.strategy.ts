import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

export class LocalStrategy extends PassportStrategy(Strategy) {
    async validate(username: string, password: string) {
        
    }
}