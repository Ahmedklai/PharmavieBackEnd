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
import { Pharmacie } from './pharmacie.model';
@Controller('pharmacie')
export class PharmacieController {
  constructor(private readonly pharmacieservice: PharmacieService) { }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addProduct(@Body() pharmacie: CreatePharmacieDto, @User() user) {
    return await this.pharmacieservice.insertPharmacie(pharmacie, user);
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @Get('/getAll')
  @UseGuards(JwtAuthGuard)
  async getAllProducts(@Req() req) {
    const products = await this.pharmacieservice.getProducts(req.query);
    return products;
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'id', description: 'id of pharmacie we want to get.' })
  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  async getProductById(@Param('id') id) {
    const pharmacie = await this.pharmacieservice.getSinglePhamrmacie(id);
    return pharmacie;
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'id', description: 'id of pharmacy we want to delete.' })
  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard)
  async removeProduct(@User() user, @Param('id') id) {
    await this.pharmacieservice.removePharmacie(id, user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pharmacy  deleted successfully',
    };
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'Pharmacy', description: 'Pharmacy body y compris lid' })
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@User() user, @Body() product: Pharmacie) {
    const addProduct = await this.pharmacieservice.updatePharmacie(product, user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pharmacy  updated successfully',
      data: addProduct,
    };
  }
}
