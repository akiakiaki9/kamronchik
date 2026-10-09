import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(`${API}/reviews/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data.error || data.detail || 'Ошибка отправки' },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error('Review proxy error:', e);
    return NextResponse.json(
      { ok: false, error: 'Сервер временно недоступен' },
      { status: 500 }
    );
  }
}