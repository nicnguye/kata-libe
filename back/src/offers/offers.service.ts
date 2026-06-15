import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Offer, Prisma } from 'generated/prisma/client';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  create(createOfferDto: Prisma.OfferCreateInput): Promise<Offer> {
    return this.prisma.offer.create({ data: createOfferDto });
  }

  findAll() {
    return this.prisma.offer.findMany();
  }

  findOne(id: string) {
    return this.prisma.offer.findUnique({ where: { id } });
  }

  update(id: string, updateOfferDto: Prisma.OfferUpdateInput) {
    return this.prisma.offer.update({ where: { id }, data: updateOfferDto });
  }

  remove(id: string) {
    return this.prisma.offer.delete({ where: { id } });
  }
}
