import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaService();

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST: /users', () => {
    it('should returns the created user', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send({
          firstName: 'Jean',
          lastName: 'Reno',
          gender: 'Male',
          age: 30,
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email');
    });

    it('should returns ConflictException if user email already exists', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          firstName: 'Jean',
          lastName: 'Reno',
          gender: 'Male',
          age: 30,
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(409);
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: 'test@example.com',
      },
    });
    await prisma.$disconnect();
    await app.close();
  });
});
