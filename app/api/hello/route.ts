import { NextResponse } from 'next/server';
import os from 'node:os';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from nextjs-sample on swkoo.kr (image-updater test)',
    hostname: os.hostname(),
    servedAt: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
}
