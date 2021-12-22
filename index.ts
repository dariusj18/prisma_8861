import { PrismaClient } from '@prisma/client'

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
          id: 'af959e43-60f2-4d7b-aad4-ba3f7b11c9e1',
          user: { connect: { id: '62edd1de-868b-4698-b802-b7eb030ace4e'} }, // This shouldn't be required
        }
      }
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
