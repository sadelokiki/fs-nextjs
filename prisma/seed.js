const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Jane',
    email: 'jane@example.com',
    posts: {
      create: [
        {
          title: 'First Post',
          content: 'Hello, World!',
        },
      ],
    },
  },
  {
    name: 'Joe',
    email: 'joe@example.com',
    posts: {
      create: [
        {
          title: 'Second Post',
          content: 'Hello, Journal!',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
