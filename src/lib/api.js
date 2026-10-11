import { cacheLife } from 'next/cache';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getMenu() {
    'use cache';
    cacheLife('minutes');

    if (!API) {
        console.warn('NEXT_PUBLIC_API_URL не задан — меню пустое');
        return [];
    }

    try {
        const res = await fetch(`${API}/menu/`, {
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) {
            console.warn('Menu fetch failed:', res.status);
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.warn('Menu fetch error:', e.message);
        return [];
    }
}