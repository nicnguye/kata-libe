import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Offer } from 'generated/prisma/client';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
    }
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
    }

    return this.offersService.remove(id);
  }
}
