import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Gustavo Martins',
    email: 'admin@email.com',
    passwordHash: 'Rise12@#',
    role: 'ADMIN',
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        passwordHash: await bcrypt.hash(obj.passwordHash, 10),
      },
    });
  }
};
