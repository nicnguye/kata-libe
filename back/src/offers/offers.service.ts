import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Offer } from 'src/generated/prisma/client';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  create(createOfferDto: Prisma.OfferCreateInput): Promise<Offer> {
    return this.prisma.offer.create({ data: createOfferDto });
  }

  findAll(): Promise<Offer[]> {
    return this.prisma.offer.findMany();
  }

  findOne(id: string): Promise<Offer | null> {
    return this.prisma.offer.findUnique({ where: { id } });
  }
}
