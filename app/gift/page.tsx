'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/lib/auth';
import { searchUsers, getRecentContacts, getSuggestedContacts } from '@/lib/api';
import { RecentUser } from '@/types';

// ─── Avatar helper ────────────────────────────────────────────────────────────
function Avatar({ src, name, size = 'md' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
    const sizes = { sm: 'h-11 w-11 text-base', md: 'h-12 w-12 text-base', lg: 'h-14 w-14 text-lg' };
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

    if (src) {
        return (
            <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover bg-indigo-100`} />
        );
    }
    return (
        <div className={`${sizes[size]} rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-[#6366f1] flex-shrink-0`}>
            {initials}
        </div>
    );
}


function UserRow({ user, onClick }: { user: User | RecentUser; onClick: () => void }) {
    const subtitle = (user as RecentUser).lastGiftedAt
        ? `Gifted you on ${(user as RecentUser).lastGiftedAt}`
        : user.mobile || user.uid;

    return (
        <button
            onClick={onClick}
            className="flex items-center w-full gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group"
        >
            <Avatar src={user.avatarUrl} name={user.name || user.mobile} size="md" />
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                    {user.name || <span className="text-gray-400 font-normal">—</span>}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{subtitle}</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

function GiftContactContent() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useRequireAuth();

    const [query, setQuery] = useState('');
    const [recents, setRecents] = useState<RecentUser[]>([]);
    const [suggested, setSuggested] = useState<RecentUser[]>([]);
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [searching, setSearching] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const load = async () => {
            // One call returns both recents + suggested (POST /users/me/recents)
            const [r, s] = await Promise.all([
                getRecentContacts().catch(e => { console.error('[recents]', e); return []; }),
                getSuggestedContacts().catch(e => { console.error('[suggested]', e); return []; }),
            ]);
            setRecents(r);
            setSuggested(s);
            setDataLoading(false);
        };
        load();
    }, [user]);

    const handleSearch = useCallback(async (q: string) => {
        setQuery(q);
        if (!q.trim()) { setSearchResults([]); return; }
        setSearching(true);
        try {
            const results = await searchUsers(q);
            setSearchResults(results);
        } catch {
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    }, []);

    const goToGift = (uid: string) => {
        const giftingUrl = process.env.NEXT_PUBLIC_GIFTING_URL || 'http://localhost:3001';
        const token = localStorage.getItem('token') || '';
        window.location.href = `${giftingUrl}/usergifting?user=${uid}&token=${token}`;
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-8 sm:pb-8 sm:p-4">
            <div className="w-full sm:max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden flex flex-col" style={{ minHeight: 'min(780px, 100vh)' }}>

                {/* Header */}
                <div className="flex items-center gap-3 px-4 pt-14 sm:pt-6 pb-4 border-b border-gray-50">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-9">Gift Contact</h1>
                </div>

                {/* Search */}
                <div className="px-4 py-4">
                    <p className="text-xs text-gray-400 mb-3">Gift anyone on Bahumati</p>
                    <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300 border border-transparent transition-all">
                        <input
                            type="text"
                            placeholder="Enter UID or Mobile number or Name"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                        />
                        {searching ? (
                            <div className="h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                        ) : (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Search Results */}
                    {query.trim() && (
                        <div>
                            {searchResults.length > 0 ? (
                                <div>
                                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Results</p>
                                    {searchResults.map((u) => (
                                        <UserRow key={u.uid} user={u} onClick={() => goToGift(u.uid)} />
                                    ))}
                                </div>
                            ) : !searching && (
                                <div className="flex flex-col items-center justify-center py-16 text-center px-8">
                                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">No users found</p>
                                    <p className="text-xs text-gray-400 mt-1">Try a different name, mobile, or UID</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Default: Recents + Suggested + All Users */}
                    {!query.trim() && (
                        <div>
                            {/* Recents */}
                            {recents.length > 0 && (
                                <div className="px-4 pb-4">
                                    <p className="py-2 text-sm font-bold text-gray-900">Recents</p>
                                    <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-hide">
                                        {recents.map((u) => (
                                            <button
                                                key={u.uid}
                                                onClick={() => goToGift(u.uid)}
                                                className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
                                            >
                                                <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center text-[#6366f1] font-bold text-lg group-hover:ring-2 group-hover:ring-indigo-300 transition-all">
                                                    {u.avatarUrl
                                                        ? <img src={u.avatarUrl} alt={u.name} className="h-full w-full rounded-full object-cover" />
                                                        : (u.name?.[0] || '?').toUpperCase()
                                                    }
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium max-w-[56px] truncate">{u.name || 'User'}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggested */}
                            {suggested.length > 0 && (
                                <div>
                                    <p className="px-4 py-2 text-sm font-bold text-gray-900">Suggested</p>
                                    <div className="divide-y divide-gray-50">
                                        {suggested.map((u) => (
                                            <UserRow key={u.uid} user={u} onClick={() => goToGift(u.uid)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Users — shown once backend ships GET /users */}

                            {dataLoading && (
                                <div className="flex justify-center py-12">
                                    <div className="h-6 w-6 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GiftContactPage() {
    return <GiftContactContent />;
}
