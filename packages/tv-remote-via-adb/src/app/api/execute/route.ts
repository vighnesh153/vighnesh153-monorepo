import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { logs } from '@/lib/logs';

export async function POST(request: NextRequest) {
  console.log('Inside /api/execute');

  const url = new URL(request.url);
  const device = url.searchParams.get('device');
  const partialCommand = url.searchParams.get('command');

  const command = `adb -s ${device} ${partialCommand}`;
  logs.push({ command, time: Date.now() });
  console.log(`Executing command: ${command}`);
  const result = execSync(command).toString();
  console.log(`Result: ${result}`);
  return NextResponse.json({ result });
}
