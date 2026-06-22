import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { App } from 'supertest/types';
import * as bcrypt from 'bcrypt';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaService();
const jwtService = new JwtService();

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;
  let userData: any;

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

    await prisma.user.create({
      data: userData,
    });
  });

  describe('POST: /auth/login', () => {
    it('should returns accessToken', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(res.body).toHaveProperty('accessToken');
      expect(typeof res.body.accessToken).toBe('string');
    });

    it('should returns NotFoundException if user is not found', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrongEmail@example.com',
          password: 'password123',
        })
        .expect(404);
    });

    it('should returns UnauthorizedException if password does not match', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword',
        })
        .expect(401);
    });
  });

  describe('GET: /auth/profile', () => {
    it('should returns user profile', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const { password, ...rest } = userData;

      const expectedUserData = {
        ...rest,
        subscription: [],
      };

      expect(res.body).toEqual(expectedUserData);
    });

    it('should throws UnauthorizedException if no accessToken', async () => {
      await request(app.getHttpServer()).get('/auth/profile').expect(401);
    });

    it('should throws UnauthorizedException if accessToken is invalid', async () => {
      await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer wrongAccessToken')
        .expect(401);
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: 'e0432384-440c-4311-9ffb-15f9ad1957f3',
      },
    });
    await prisma.$disconnect();
    await app.close();
  });
});
