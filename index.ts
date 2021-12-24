import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
})

async function main() {
  const post = await prisma.post.create({
    data: {
      title: 'test',
      user: { connect: { id: '62edd1de-868b-4698-b802-b7eb030ace4e' } },
      postMetas: {
        create: {
          user: { connect: { id: '62edd1de-868b-4698-b802-b7eb030ace4e'} }, // This shouldn't be required
          type: { connect: { id: 'a38e3f17-cf6d-43f0-89ba-2673d0c77050' } },
        },
      }
    },
    include: {
      postMetas: {},
    }
  });

  console.log(post);
  
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
