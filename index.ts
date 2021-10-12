import { parseFile } from '@fast-csv/parse';
import { Post, PrismaClient, TagType } from '@prisma/client';
import { userIds } from './constants';

const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
});

async function main() {
  const posts = await (() => {
    const promises: ReturnType<typeof prisma.post.upsert>[] = [];

    return new Promise<Post[]>((resolve, reject) => {
      const stream = parseFile(`${__dirname}/data/posts.csv`, {
        headers: true,
        ignoreEmpty: true,
      });

      stream.on('data',
        (row: {
          postId: string;
          type: string;
          title: string;
          lang: string;
          content: string;
        }) => {
          promises.push(prisma.post.upsert({
            where: {
              id: row.postId,
            },
            update: {},
            create: {
              id: row.postId,
              title: row.title,
              userId: userIds.author1,
              tags: {
                create: {
                  tag: { 
                    connectOrCreate: {
                      where: {
                        name_type_userId: {
                          name: row.lang,
                          type: TagType.LANGUAGE,
                          userId: userIds.publisher1
                        }
                      },
                      create: {
                        name: row.lang,
                        type: TagType.LANGUAGE,
                        userId: userIds.publisher1
                      }
                    }
                  }
                }
              }
            },
          }));
        }
      )

      stream.on('error', error => {
        reject(error);
      });

      stream.on('end', (rowCount: number) => {
        Promise.all(promises)
          .then(value => {
            resolve(value);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  })();
  console.log(posts.length, 'Posts upserted');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
