import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OffersService } from './offers.service';

@Injectable()
export class OfferExistGuard implements CanActivate {
  constructor(private readonly offersService: OffersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const offerId = request.params.id as string;

    if (!offerId) {
      throw new BadRequestException('Offer Id is missing');
    }

    const offer = await this.offersService.findOne(offerId);
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    return true;
  }
}
