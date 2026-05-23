import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BILIBILI_SEARCH_URL = 'https://api.bilibili.com/x/web-interface/search/type';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://www.bilibili.com',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9',
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get('keyword') || '美女';
  const page = parseInt(searchParams.get('page') || '1');

  try {
    const res = await axios.get(BILIBILI_SEARCH_URL, {
      headers: HEADERS,
      params: {
        search_type: 'video',
        keyword,
        page,
        page_size: 20,
      },
      timeout: 8000,
    });

    const data = res.data?.data;
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
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `搜索失败: ${message}` }, { status: 500 });
  }
}
