import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneBy(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  getUserProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { subscription: { include: { offer: true } } }, // Get user with subscription and offer data
    });
  }

}
