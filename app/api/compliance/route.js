import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'compliance.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read compliance.json", error);
    // Return empty array if file fails to load or parse
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== 'Bearer yfyadmin2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    
    // Quick validation
    if (!Array.isArray(payload)) {
      return NextResponse.json({ error: 'Payload must be an array of compliance dates.' }, { status: 400 });
    }

    // Write the new data
    await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Compliance data updated successfully.' });
  } catch (error) {
    console.error("Failed to write compliance.json", error);
    return NextResponse.json({ error: 'Failed to update compliance data.' }, { status: 500 });
  }
}
