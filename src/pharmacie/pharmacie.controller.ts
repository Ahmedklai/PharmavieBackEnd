import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpStatus,
    UseGuards,
    Req,
    Query,
    Put,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
 

  import { User } from 'src/user/decorators/user.decorator';
  
  import { ApiHeader, ApiParam } from '@nestjs/swagger';
import { PharmacieService } from './pharmacie.service';
import { CreatePharmacieDto } from './dto/createPharmacie.dto';

  
  @Controller('pharmacie')
  export class PharmacieController {
    constructor(private readonly pharmacieservice: PharmacieService) {}
  
    @ApiHeader({
      name: 'Bearer',
      description: 'the token we need for auth.',
    })
    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async addProduct(@Body() pharmacie: CreatePharmacieDto, @User() user) {
      return await this.pharmacieservice.insertPharmacie(pharmacie, user);
    }
  
  }
  