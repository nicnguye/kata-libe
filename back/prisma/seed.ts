import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.offer.createMany({
    data: [
      {
        id: 'a621b676-e6e0-4281-a2a4-35c0bb1259aa',
        title: 'Offre 1',
        description: "L'essentiel sans se ruiner !",
        price: 10,
        advantage: 'appels illimités, 300 sms',
        allowFirstSubscription: true,
        allowResubscription: false,
        allowUpgrade: false,
      },
      {
        id: 'a4409336-e7da-4b10-a30e-dafff549bd48',
        title: 'Offre 2',
        description: 'Le kit complet sans limites !',
        price: 15,
        advantage: 'appels illimités, sms illimités',
        allowFirstSubscription: true,
        allowResubscription: true,
        allowUpgrade: true,
      },
      {
        id: '0b623f38-7fb4-4441-a216-2616e44ce7b0',
        title: 'Offre 3',
        description: 'Parfait pour les voyageurs !',
        price: 20,
        advantage: 'appels illimités, sms illimités, ROAMING en europe',
        allowFirstSubscription: true,
        allowResubscription: true,
        allowUpgrade: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
