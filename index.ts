import { parseFile } from '@fast-csv/parse';
import { Language, Post, Prisma, PrismaClient, TagType, UserType } from '@prisma/client';
import { tagIds, userIds } from './constants';

const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
});

async function main() {
  const user = prisma.user.findMany({
    where: {
      username: { not: { contains: 'ed', mode: 'insensitive' } }
    }
  })
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
