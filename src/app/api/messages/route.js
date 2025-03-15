import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // JSON dosyasının yolunu belirle
    const filePath = path.join(process.cwd(), 'src/app/data/messages.json');
    
    // Veriyi JSON dosyasına yaz
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Mesajlar başarıyla güncellendi' });
  } catch (error) {
    console.error('Error updating messages data:', error);
    return NextResponse.json(
      { success: false, message: 'Mesajlar güncellenirken bir hata oluştu', error: error.message },
      { status: 500 }
    );
  }
} 