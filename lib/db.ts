import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'gallery.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.exec(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT NOT NULL,
        title TEXT NOT NULL,
        cover TEXT NOT NULL,
        author TEXT,
        url TEXT NOT NULL,
        play_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        saved_at INTEGER NOT NULL
      )
    `);
  }
  return db;
}

export interface GalleryItem {
  id?: number;
  source: string;
  title: string;
  cover: string;
  author: string;
  url: string;
  play_count: number;
  like_count: number;
  saved_at: number;
}
