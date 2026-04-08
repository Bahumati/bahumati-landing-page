'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/lib/auth';

/**
 * Self-gift entry point.
 * After login, we know the user's own UID → redirect to /usergifting?user=<uid>&self=true
 * The usergifting page handles the "You are Self Gifting" UI variant.
 */
export default function SelfGiftPage() {
    const router = useRouter();
    const { user, isLoading } = useRequireAuth('/selfgift');

    useEffect(() => {
        if (!isLoading && user) {
            const giftingUrl = process.env.NEXT_PUBLIC_GIFTING_URL || 'http://localhost:3001';
            const token = localStorage.getItem('token') || '';
            window.location.href = `${giftingUrl}/usergifting?user=${user.uid}&self=true&token=${token}`;
        }
    }, [user, isLoading, router]);

    // Show spinner while authenticating or redirecting
    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <p className="text-sm text-gray-400">Preparing your self-gift...</p>
            </div>
        </div>
    );
}
