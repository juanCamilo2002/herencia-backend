import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const passwordHash = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepo.create({ ...createUserDto, password: passwordHash });
        return this.userRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }

    async update(id: string, partialUser: Partial<User>): Promise<User> {
        await this.userRepo.update(id, partialUser);
        const user = await this.userRepo.findOne({ where: {id}});

        return plainToInstance(User, user);
    }
}
