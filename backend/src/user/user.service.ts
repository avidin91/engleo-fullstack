import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExist)
      throw new BadRequestException('This email is already exist!');

    try {
      const hashedPassword = await encodePassword(createUserDto.password);

      const user = await this.userRepository.save({
        email: createUserDto.email,
        passwordHash: hashedPassword,
      });

      return { user };
    } catch (error) {
      console.error('Error occurred during user creation:', error);
      throw new InternalServerErrorException(
        'Failed to create user due to internal server error',
      );
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
}
