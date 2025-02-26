import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

//file path to JSON
const jsonFilePath = path.join(process.cwd(), 'src/data/inventoryData.json');

// GET: Read JSON Data
export async function GET() {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(data); 
    return NextResponse.json(jsonData); 
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
