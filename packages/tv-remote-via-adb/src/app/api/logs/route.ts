import { NextResponse } from 'next/server';
import { logs } from '@/lib/logs';

export async function GET() {
  console.log('Inside /api/logs');

  return NextResponse.json({ logs });
}
