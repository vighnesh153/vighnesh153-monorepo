import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Inside /api/devices');

  try {
    const devices = execSync('adb devices')
      .toString()
      .split('\n')
      .filter((line) => Boolean(line))
      .slice(1)
      .map((device) => device.split('\t')[0]);
    return NextResponse.json({ devices });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to fetch devices', error: e }, { status: 500 });
  }
}
