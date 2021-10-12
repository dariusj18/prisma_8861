import { PrismaClient, UserType } from '@prisma/client';
import { userIds } from '../constants';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

const main = async () => {
  // create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: {
        id: userIds.publisher1,
      },
      update: {},
      create: {
        id: userIds.publisher1,
        username: 'publisher1',
        type: UserType.PUBLISHER,
      },
    }),
    prisma.user.upsert({
      where: {
        id: userIds.author1,
      },
      update: {},
      create: {
        id: userIds.author1,
        username: 'author1',
        type: UserType.AUTHOR,
      },
    }),
    prisma.user.upsert({
      where: {
        id: userIds.author2,
      },
      update: {},
      create: {
        id: userIds.author2,
        username: 'author2',
        type: UserType.AUTHOR,
      },
    }),
    prisma.user.upsert({
      where: {
        id: userIds.editor1,
      },
      update: {},
      create: {
        id: userIds.editor1,
        username: 'editor1',
        type: UserType.EDITOR,
      },
    }),
    prisma.user.upsert({
      where: {
        id: userIds.editor2,
      },
      update: {},
      create: {
        id: userIds.editor2,
        username: 'editor2',
        type: UserType.EDITOR,
      },
    }),
  ]);

};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
