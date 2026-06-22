import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { OfferResponseDto } from './dto/offer-response.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOkResponse({ type: OfferResponseDto })
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @ApiOkResponse({ type: OfferResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }
}
