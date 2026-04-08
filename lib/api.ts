import { User, RecentUser, GiftTransaction } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server.bahumati.in/api/v1';

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

function authHeaders(): HeadersInit {
    const token = getToken();
    return token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };
}

function mapUser(u: any): User {
    return {
        uid: u._id,
        name: u.fullName,
        mobile: u.number,
        avatarUrl: u.qrCodeUrl,
    };
}

// POST /users/login  { number } → sends OTP
export async function requestOtp(mobile: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: mobile }),
    });
    if (!res.ok) throw new Error('Failed to send OTP');
}

// POST /users/verify-otp  { number, otp } → { token }
export async function verifyOtp(mobile: string, otp: string): Promise<{ token: string }> {
    const res = await fetch(`${BASE_URL}/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: mobile, otp }),
    });
    if (!res.ok) throw new Error('Invalid OTP');
    return res.json();
}

// GET /users/me → { user }
export async function getMe(): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/me`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Not authenticated');
    const data = await res.json();
    return mapUser(data.user);
}

// POST /users/me/find-friend  { value: uid|mobile|name } → { success, user }
export async function getUser(uid: string): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/me/find-friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: uid }),
    });
    if (!res.ok) throw new Error('User not found');
    const data = await res.json();
    if (!data.success || !data.user) throw new Error('User not found');
    return mapUser(data.user);
}

// POST /users/me/find-friend  { value: query } → { success, user }
// Returns array for consistent interface (backend returns single user)
export async function searchUsers(query: string): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users/me/find-friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: query }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success || !data.user) return [];
    return [mapUser(data.user)];
}

// POST /users/me/recents → { recents, suggestions } (legacy endpoint, used by mobile app)
// Returns both recent contacts and suggested contacts in one call
async function fetchRecentsAndSuggested(): Promise<{ recents: RecentUser[]; suggested: RecentUser[] }> {
    const res = await fetch(`${BASE_URL}/users/me/recents`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({}),
    });
    if (!res.ok) throw new Error(`recents fetch failed (${res.status})`);
    const data = await res.json();

    const recents: RecentUser[] = (data.recents || []).map((u: any) => mapUser(u));
    const suggested: RecentUser[] = (data.suggestions || []).map((u: any) => ({
        ...mapUser(u),
        lastGiftedAt: u.lastGiftedDate || u.lastGiftedAt,
    }));
    return { recents, suggested };
}

export async function getRecentContacts(): Promise<RecentUser[]> {
    const { recents } = await fetchRecentsAndSuggested();
    return recents;
}

export async function getSuggestedContacts(): Promise<RecentUser[]> {
    const { suggested } = await fetchRecentsAndSuggested();
    return suggested;
}

// GET /users → not yet deployed; returns empty until backend ships the endpoint
export async function getAllUsers(): Promise<User[]> {
    return [];
}

// POST /gifts/send → { transactionId, giftId }
// TODO: Remove mock and uncomment real call once backend deploys POST /gifts/send
export async function sendGift(payload: {
    toUid: string;
    amount: number;
    assetType: 'GOLD' | 'EQUITY';
    message?: string;
    attachmentType?: string;
    attachmentUrl?: string;
}): Promise<{ transactionId: string; giftId?: string }> {
    // ── MOCK (remove when backend is live) ──────────────────────────────────
    await new Promise(r => setTimeout(r, 800));
    return {
        transactionId: `BAHU${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        giftId: `GIFT${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    };
    // ── Real call (uncomment when backend deploys /gifts/send) ──────────────
    // const res = await fetch(`${BASE_URL}/gifts/send`, {
    //     method: 'POST',
    //     headers: authHeaders(),
    //     body: JSON.stringify(payload),
    // });
    // if (!res.ok) {
    //     let msg = `Gift send failed (${res.status})`;
    //     try { const data = await res.json(); msg = data.message || msg; } catch {}
    //     throw new Error(msg);
    // }
    // return res.json();
}

// GET /gifts/status/:txId (not yet implemented by backend — status built from URL params)
export async function getGiftStatus(_txId: string): Promise<GiftTransaction | null> {
    return null;
}

// POST /uploads/private (multipart) → { key }
export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const token = getToken();
    const res = await fetch(`${BASE_URL}/uploads/private`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.key;
}

// GET /uploads/getpresignedurl?key= → { url }
export async function getPresignedUrl(key: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/uploads/getpresignedurl?key=${encodeURIComponent(key)}`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to get presigned URL');
    const data = await res.json();
    return data.url;
}
