import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService
    ) { }

    async register(dto: RegisterDto) {
        return this.userService.create(dto);
    }

    async login(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.getTokens(payload);
    }


    async getTokens(payload: any) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('jwt.accessSecret'),
                expiresIn: this.configService.get('jwt.accessExpiresIn'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('jwt.refreshSecret'),
                expiresIn: this.configService.get('jwt.refreshExpiresIn'),
            }),
        ]);

        return {
            access_token,
            refresh_token
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const { password: _, ...rest } = user;
        return rest;
    }

    async refreshTokens(refresh_token: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refresh_token, {
                secret: this.configService.get<string>('jwt.refreshSecret')
            });

            const user = await this.userService.findByEmail(payload.email);
            if (!user) throw new NotFoundException('Usuario no encontrado');

            const newPayload = {
                sub: user.id,
                email: user.email,
                role: user.role
            };

            return this.getTokens(newPayload);
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }

    async sendResetPasswordEmail(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return;

        const token = this.jwtService.sign(
            { sub: user.id, email: user.email },
            {
                secret: this.configService.get<string>('jwt.resetSecret'),
                expiresIn: this.configService.get<string>('jwt.resetExpiresIn')
            }
        );

        const resetLink = `http://localhost:3000/reset-password?token=${token}`

        await this.mailerService.sendResetPassword(
            user.email,
            user.name,
            resetLink
        );
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('jwt.resetSecret'),
            });

            const user = await this.userService.findByEmail(payload.email);
            if (!user) throw new UnauthorizedException();

            const hash = await bcrypt.hash(newPassword, 10);
            user.password = hash;
            await this.userService.update(user.id, user);
            return { message: 'Password updated successfully' };
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
