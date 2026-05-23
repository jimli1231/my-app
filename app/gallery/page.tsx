'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Search, Heart, Trash2, ExternalLink, BookmarkCheck, Loader2 } from 'lucide-react';

const STORAGE_KEY = 'gallery_saved';

interface VideoItem {
  source: string;
  bvid?: string;
  title: string;
  cover: string;
  author: string;
  url: string;
  play_count: number;
  like_count: number;
  saved_at?: number;
}

type Tab = 'search' | 'saved';

function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万';
  return String(n);
}

function loadFromStorage(): VideoItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveToStorage(items: VideoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function VideoCard({
  item,
  onSave,
  onDelete,
  saved,
  mode,
}: {
  item: VideoItem;
  onSave?: (item: VideoItem) => void;
  onDelete?: (url: string) => void;
  saved: boolean;
  mode: Tab;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          unoptimized
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full uppercase font-medium">
            {item.source}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-2">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="truncate max-w-[120px]">@{item.author}</span>
          <div className="flex items-center gap-2">
            {item.play_count > 0 && <span>▶ {formatCount(item.play_count)}</span>}
            {item.like_count > 0 && <span>♥ {formatCount(item.like_count)}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors"
          >
            <ExternalLink size={12} />
            查看原帖
          </a>
          {mode === 'search' && onSave && (
            <button
              onClick={() => !saved && onSave(item)}
              disabled={saved}
              className={`flex-1 flex items-center justify-center gap-1 text-xs rounded-lg py-1.5 transition-colors ${
                saved
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200'
              }`}
            >
              {saved ? <BookmarkCheck size={12} /> : <Heart size={12} />}
              {saved ? '已收藏' : '收藏'}
            </button>
          )}
          {mode === 'saved' && onDelete && (
            <button
              onClick={() => onDelete(item.url)}
              className="flex-1 flex items-center justify-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg py-1.5 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={12} />
              删除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [tab, setTab] = useState<Tab>('search');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VideoItem[]>([]);
  const [savedItems, setSavedItems] = useState<VideoItem[]>([]);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const items = loadFromStorage();
    setSavedItems(items);
    setSavedUrls(new Set(items.map((i) => i.url)));
  }, []);

  const search = useCallback(async (kw: string, p: number): Promise<boolean> => {
    if (!kw.trim()) return false;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(kw)}&page=${p}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (p === 1) {
        setResults(data.items);
      } else {
        setResults((prev) => [...prev, ...data.items]);
      }
      setTotal(data.total);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : '搜索失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleSearch() {
    setPage(1);
    setResults([]);
    await search(keyword, 1);
  }

  async function loadMore() {
    const next = page + 1;
    const ok = await search(keyword, next);
    if (ok) setPage(next);
  }

  function handleSave(item: VideoItem) {
    if (savedUrls.has(item.url)) return;
    const newItem = { ...item, saved_at: Date.now() };
    const updated = [newItem, ...savedItems];
    setSavedItems(updated);
    setSavedUrls((prev) => new Set([...prev, item.url]));
    saveToStorage(updated);
  }

  function handleDelete(url: string) {
    const updated = savedItems.filter((i) => i.url !== url);
    setSavedItems(updated);
    setSavedUrls((prev) => {
      const next = new Set(prev);
      next.delete(url);
      return next;
    });
    saveToStorage(updated);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
          <h1 className="text-xl font-bold text-pink-600 shrink-0">✨ 内容聚合</h1>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['search', 'saved'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === t ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'search' ? '🔍 搜索' : `❤️ 收藏 (${savedItems.length})`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'search' && (
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入关键词搜索 B 站视频..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              搜索
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {tab === 'search' && (
          <>
            {results.length > 0 && (
              <p className="text-xs text-gray-400 mb-4">
                共找到约 {total} 个结果，已显示 {results.length} 个
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item, i) => (
                <VideoCard
                  key={item.bvid || i}
                  item={item}
                  onSave={handleSave}
                  saved={savedUrls.has(item.url)}
                  mode="search"
                />
              ))}
            </div>
            {results.length > 0 && results.length < total && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-white border border-gray-300 hover:border-pink-400 text-gray-600 hover:text-pink-600 px-8 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 flex items-center gap-2 mx-auto"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  加载更多
                </button>
              </div>
            )}
            {!loading && results.length === 0 && keyword && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p>没有找到相关内容</p>
              </div>
            )}
            {!keyword && results.length === 0 && (
              <div className="text-center py-20 text-gray-300">
                <p className="text-5xl mb-4">✨</p>
                <p className="text-gray-400">输入关键词开始搜索 B 站公开视频</p>
                <p className="text-xs text-gray-300 mt-2">数据来源：B 站公开搜索接口</p>
              </div>
            )}
          </>
        )}

        {tab === 'saved' && (
          <>
            {savedItems.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">❤️</p>
                <p>还没有收藏任何内容</p>
                <p className="text-xs text-gray-300 mt-2">在搜索结果中点击「收藏」即可保存</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {savedItems.map((item) => (
                  <VideoCard
                    key={item.url}
                    item={item}
                    onDelete={handleDelete}
                    saved={true}
                    mode="saved"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
