import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { App } from 'supertest/types';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaService();
const jwtService = new JwtService();

describe('SubscriptionsController (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;
  let userData: any;
  let subscriptionId: string;
  let offerId1: string;
  let offerId2: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    userData = {
      id: 'e0432384-440c-4311-9ffb-15f9ad1957f3',
      firstName: 'Jean',
      lastName: 'Reno',
      gender: 'Male',
      age: 30,
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    };

    accessToken = await jwtService.signAsync(
      {
        sub: 'e0432384-440c-4311-9ffb-15f9ad1957f3',
        email: 'test@example.com',
      },
      { secret: process.env.JWT_SECRET, expiresIn: '2m' },
    );

    offerId1 = 'a621b676-e6e0-4281-a2a4-35c0bb1259aa';
    offerId2 = 'a4409336-e7da-4b10-a30e-dafff549bd48';

    await prisma.user.create({
      data: userData,
    });
  });

  describe('POST: /subscriptions', () => {
    it('should returns new subscription', async () => {
      const res = await request(app.getHttpServer())
        .post('/subscriptions')
        .send({
          userId: userData.id,
          offerId: offerId1,
        })
        .expect(201);

      expect(res.body).toHaveProperty('userId');
      expect(res.body).toHaveProperty('offerId');
      expect(res.body.status).toBe('ACTIVE');
    });

    it('should returns ConflictException if user already has an active subscription', async () => {
      await request(app.getHttpServer())
        .post('/subscriptions')
        .send({
          userId: userData.id,
          offerId: offerId1,
        })
        .expect(409);
    });
  });

  describe('POST: /subscriptions/:id/change', () => {
    it('should returns the updated subscription', async () => {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: userData.id,
          status: 'ACTIVE',
        },
      });
      subscriptionId = subscription.id;

      const res = await request(app.getHttpServer())
        .post(`/subscriptions/${subscriptionId}/change`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          userId: userData.id,
          offerId: offerId2,
        })
        .expect(200);

      expect(res.body.offerId).toBe(offerId2);
      expect(res.body.status).toBe('ACTIVE');
    });

    it('should throws UnauthorizedException if no accessToken', async () => {
      await request(app.getHttpServer())
        .post(`/subscriptions/${subscriptionId}/change`)
        .send({
          userId: userData.id,
          offerId: offerId2,
        })
        .expect(401);
    });

    it('should throws NotFoundException if subscription is not found', async () => {
      await request(app.getHttpServer())
        .post('/subscriptions/wrongId/change')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          userId: userData.id,
          offerId: offerId2,
        })
        .expect(404);
    });
  });

  describe('POST: /subscriptions/:id/cancel', () => {
    it('should returns the updated subscription', async () => {
      const res = await request(app.getHttpServer())
        .post(`/subscriptions/${subscriptionId}/cancel`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.status).toBe('CANCELLED');
    });
  });

  afterAll(async () => {
    const deleteSubscription = prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });
    const deleteUser = prisma.user.delete({
      where: {
        id: userData.id,
      },
    });
    await prisma.$transaction([deleteSubscription, deleteUser]);
    await prisma.$disconnect();
    await app.close();
  });
});
