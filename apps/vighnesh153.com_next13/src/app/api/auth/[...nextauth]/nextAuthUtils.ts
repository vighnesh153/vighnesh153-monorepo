import { Account, User } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';
import { PrismaTransaction } from '@/lib/prisma';

export function nextAuthIsGoogleProvider(account: Account | null): boolean {
  return account?.provider === 'google';
}

export function nextAuthIsGoogleProfileVerified(googleProfile: GoogleProfile): boolean {
  return googleProfile.email_verified;
}

export async function nextAuthCheckIsUserRegistered(tx: PrismaTransaction, user: User): Promise<boolean> {
  const userInfo = await tx.userInfo.findUnique({
    where: {
      userId: user.id,
    },
  });
  return userInfo !== null;
}
