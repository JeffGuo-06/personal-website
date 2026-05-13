export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  views?: number;
  shares?: number;
}

interface RawMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
}

interface MediaResponse {
  data: RawMedia[];
  paging?: {
    cursors: {
      after?: string;
    };
    next?: string;
  };
}

interface InsightsResponse {
  data: {
    name: string;
    values: { value: number }[];
  }[];
}

const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN;
const BASE_URL = 'https://graph.instagram.com';
const MEDIA_FIELDS =
  'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count';

async function fetchInsights(mediaId: string): Promise<{ views?: number; shares?: number }> {
  try {
    const res = await fetch(
      `${BASE_URL}/${mediaId}/insights?metric=views,shares&access_token=${INSTAGRAM_TOKEN}`
    );
    if (!res.ok) return {};
    const data: InsightsResponse = await res.json();
    const views = data.data.find((i) => i.name === 'views')?.values[0]?.value;
    const shares = data.data.find((i) => i.name === 'shares')?.values[0]?.value;
    return { views, shares };
  } catch {
    return {};
  }
}

export async function fetchInstagramMedia(limit = 50): Promise<InstagramMedia[]> {
  if (!INSTAGRAM_TOKEN) {
    throw new Error('Instagram token not configured');
  }

  const allRaw: RawMedia[] = [];
  let url: string | null =
    `${BASE_URL}/me/media?fields=${MEDIA_FIELDS}&limit=${Math.min(limit, 25)}&access_token=${INSTAGRAM_TOKEN}`;

  while (url && allRaw.length < limit) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data: MediaResponse = await response.json();
    for (const item of data.data) {
      if (allRaw.length >= limit) break;
      allRaw.push(item);
    }

    url = data.paging?.next ?? null;
  }

  // Fetch insights for all posts in parallel
  const insightsResults = await Promise.all(allRaw.map((item) => fetchInsights(item.id)));

  return allRaw.map((item, i) => ({
    id: item.id,
    caption: item.caption,
    media_type: item.media_type,
    media_url: item.media_url,
    thumbnail_url: item.thumbnail_url,
    permalink: item.permalink,
    timestamp: item.timestamp,
    like_count: item.like_count,
    comments_count: item.comments_count,
    ...insightsResults[i],
  }));
}
