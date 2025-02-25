import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

//file path to json
const jsonFilePath = path.join(process.cwd(), 'src/data/inventoryData.json');


// PUT: Update JSON Data
export async function PUT(req: Request) {
    try {
      const body = await req.json();
      // write new data to the JSON file
      fs.writeFileSync(jsonFilePath, JSON.stringify(body, null, 2), "utf8");
  
      return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error updating JSON file:", error);
      return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
    }
  }
