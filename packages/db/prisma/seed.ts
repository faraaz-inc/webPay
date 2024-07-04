import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {
      balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      }
    },
    create: {
      number: '9999999999',
      password: await bcrypt.hash("alice", 10),
      name: 'alice',
      email: "alice@example.com",
      balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Successful",
          amount: 20000,
          token: "122",
          provider: "HDFCBank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {
      balance: {
        create: {
          amount: 200,
          locked: 0
        }
      }
    },
    create: {
      number: '9999999998',
      password: await bcrypt.hash("bob", 10),
      name: 'bob',
      email: "bob@example.com",
      balance: {
        create: {
          amount: 200,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "AxisBank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })