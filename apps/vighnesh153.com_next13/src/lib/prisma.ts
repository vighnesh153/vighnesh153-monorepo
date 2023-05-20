import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export const prisma = new PrismaClient();

export async function deleteEverything() {
  if (process.env.NODE_ENV === 'test') {
    await Promise.all(
      Object.keys(prisma).map(
        (property) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (prisma[property as keyof typeof prisma] as Prisma.AccountDelegate<any>)?.deleteMany?.() ?? (() => null)()
      )
    );
  }
}
