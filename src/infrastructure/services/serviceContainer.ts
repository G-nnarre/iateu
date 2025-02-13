import { TokenService } from '@/core/services/tokenService';
import { container } from 'tsyringe';
import { JWTTokenService } from './JWTTokenService';

container.register<TokenService>('TokenService', {
    useClass: JWTTokenService,
});

export { container as serviceContainer };
