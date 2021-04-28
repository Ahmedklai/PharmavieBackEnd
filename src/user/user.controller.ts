import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/creatUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        ) {}


        @Post()
        async register(@Body() createUserDto: CreateUserDto) {
            return await this.userService.register(createUserDto);
        }
  

}
