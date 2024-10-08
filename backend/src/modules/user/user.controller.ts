import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    // @Get()
    // findOne() {
    //   return this.userService.findOne();
    // }
}
