import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(private config: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.config.get<string>('mail.host'),
            port: this.config.get<number>('mail.port'),
            auth: {
                user: this.config.get<string>('mail.user'),
                pass: this.config.get<string>('mail.pass')
            }
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: this.config.get('mail.from'),
            to,
            subject,
            html
        });
    }

    async sendResetPassword(to: string, name: string, resetLink: string){
        const templatePath = join(__dirname, 'templates', 'reset-password.html');
        let html = await readFile(templatePath, 'utf-8');

        html = html.replace('{{name}}', name).replace('{{resetLink}}', resetLink);

        return this.sendMail(to, 'Restablece tu contraseña', html);
    }
}
