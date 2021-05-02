import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/creatUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        ) {}

        @ApiHeader({
            name: 'Bearer',
            description: 'the token we need for auth.'
        })
        @Post('/create')
        @HttpCode(HttpStatus.CREATED)
        @ApiCreatedResponse({})
        async register(@Body() createUserDto: CreateUserDto) {
            return await this.userService.register(createUserDto);
        }

        @ApiHeader({
            name: 'Bearer',
            description: 'the token we need for auth.'
        })
        @Post('/login')
        @HttpCode(HttpStatus.CREATED)
        @ApiCreatedResponse({})
        async login( @Body() loginUserDto: LoginUserDto) {
            return await this.userService.login( loginUserDto);
        }
  

}
