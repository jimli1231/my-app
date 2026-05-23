import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const db = getDb();
    db.prepare('DELETE FROM items WHERE id = ?').run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
