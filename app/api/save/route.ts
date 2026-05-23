import { NextRequest, NextResponse } from 'next/server';
import { getDb, GalleryItem } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body: GalleryItem = await req.json();
    const db = getDb();

    const existing = db.prepare('SELECT id FROM items WHERE url = ?').get(body.url);
    if (existing) {
      return NextResponse.json({ ok: false, message: '已收藏' });
    }

    const stmt = db.prepare(`
      INSERT INTO items (source, title, cover, author, url, play_count, like_count, saved_at)
      VALUES (@source, @title, @cover, @author, @url, @play_count, @like_count, @saved_at)
    `);

    const result = stmt.run({ ...body, saved_at: Date.now() });
    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
