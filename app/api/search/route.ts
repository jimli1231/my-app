import { NextRequest, NextResponse } from 'next/server';

const BILIBILI_SEARCH_URL = 'https://api.bilibili.com/x/web-interface/search/type';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://www.bilibili.com',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9',
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get('keyword') || '';
  if (!keyword.trim()) {
    return NextResponse.json({ items: [], total: 0 });
  }

  const rawPage = searchParams.get('page');
  const page = rawPage ? Number(rawPage) : 1;
  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json({ error: 'page 参数无效' }, { status: 400 });
  }

  const url = new URL(BILIBILI_SEARCH_URL);
  url.searchParams.set('search_type', 'video');
  url.searchParams.set('keyword', keyword);
  url.searchParams.set('page', String(page));
  url.searchParams.set('page_size', '20');

  try {
    const res = await fetch(url.toString(), {
      headers: HEADERS,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error('Bilibili API error:', res.status);
      return NextResponse.json({ error: '搜索失败，请稍后重试' }, { status: 502 });
    }

    const json = await res.json();
    const data = json?.data;
    if (!data || !data.result) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const items = (data.result as Record<string, unknown>[]).map((v) => ({
      source: 'bilibili',
      bvid: v.bvid as string,
      title: String(v.title || '').replace(/<[^>]+>/g, ''),
      cover: String(v.pic || '').replace(/^\/\//, 'https://'),
      author: String(v.author || v.uploader || ''),
      url: `https://www.bilibili.com/video/${v.bvid}`,
      play_count: Number(v.play) || 0,
      like_count: Number(v.favorites) || 0,
    }));

    return NextResponse.json({ items, total: data.numResults || items.length });
  } catch (err) {
    console.error('Search API failed:', err);
    return NextResponse.json({ error: '搜索失败，请稍后重试' }, { status: 500 });
  }
}
