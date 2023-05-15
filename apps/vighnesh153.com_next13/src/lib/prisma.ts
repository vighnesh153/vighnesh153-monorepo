import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export const prisma = new PrismaClient();
