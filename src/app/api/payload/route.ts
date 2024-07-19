import { NextRequest, NextResponse } from 'next/server';
import payload from '../../../../payload.json';

export async function GET(request: NextRequest) {
  return NextResponse.json(payload);
}
