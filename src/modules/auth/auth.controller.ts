import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResfreshTokenDto } from './dto/refresh-token.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Registro de usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
    @ApiBody({ type: RegisterDto })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Inicio de sesión' })
    @ApiResponse({ status: 200, description: 'Retorna access y refresh token' })
    @ApiBody({ type: LoginDto })
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Datos del usuario' })
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    @ApiOperation({ summary: 'Renovar tokens con refresh token' })
    @ApiResponse({ status: 200, description: 'Nuevos token generados' })
    @ApiBody({ type: ResfreshTokenDto })
    refresh(@Body() dto: ResfreshTokenDto) {
        return this.authService.refreshTokens(dto.refresh_token)
    }
}