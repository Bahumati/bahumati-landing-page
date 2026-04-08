'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getUser } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import { User } from '@/types';

function Avatar({ src, name, size = 'xl' }: { src?: string; name: string; size?: 'xl' }) {
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    if (src) return <img src={src} alt={name} className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl" />;
    return (
        <div className="h-24 w-24 rounded-full bg-indigo-100 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-[#6366f1]">
            {initials}
        </div>
    );
}


function GiftPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('user') || searchParams.get('uid') || '';
    const isSelf = searchParams.get('self') === 'true';

    const [targetUser, setTargetUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [assetType, setAssetType] = useState<'GOLD' | 'EQUITY'>('GOLD');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const { user: authUser, isLoading: authLoading } = useRequireAuth();

    useEffect(() => {
        if (!uid || authLoading) return;
        getUser(uid)
            .then(setTargetUser)
            .catch(() => setLoading(false))
            .finally(() => setLoading(false));
    }, [uid, authLoading]);

    useEffect(() => {
        if (!loading && targetUser) inputRef.current?.focus();
    }, [loading, targetUser]);

    const handleContinue = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        const params = new URLSearchParams({
            user: uid,
            amount,
            assetType,
            ...(isSelf ? { self: 'true' } : {}),
        });
        router.push(`/usergifting/preview?${params}`);
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!targetUser) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8">
                <p className="text-gray-500 mb-4">User not found</p>
                <button onClick={() => router.back()} className="text-sm text-[#6366f1] font-medium hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    const liveInfo = assetType === 'GOLD' ? 'Live Price: ₹11,203/g' : 'NAV: ₹145.20';

    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-8 sm:pb-8 sm:p-4">
            <div className="w-full sm:max-w-sm bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col" style={{ minHeight: 'min(780px, 100vh)' }}>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-14 sm:pt-5 pb-2">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <button className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8">

                    {/* Recipient profile */}
                    <div className="mb-8 flex flex-col items-center text-center">
                        <Avatar src={targetUser.avatarUrl} name={targetUser.name || 'U'} />
                        <h1 className="mt-4 text-2xl font-bold text-[#6366f1]">{targetUser.name || 'User'}</h1>
                        <p className="mt-1 text-xs font-medium text-gray-400">UID: {targetUser.uid}</p>

                        {isSelf && (
                            <div className="mt-3 rounded-2xl bg-indigo-50 px-4 py-2">
                                <p className="text-sm font-semibold text-[#6366f1]">
                                    🎉 You are Self Gifting. Congratulations on investing in your future!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Amount input */}
                    <div className="mb-4 flex items-center justify-center gap-1">
                        <span className="text-6xl font-bold text-gray-200">₹</span>
                        <input
                            ref={inputRef}
                            type="number"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-44 bg-transparent text-6xl font-bold text-gray-900 placeholder:text-gray-200 focus:outline-none text-center p-0 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    {/* Live price pill */}
                    <div className="mb-8 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-500">
                        {liveInfo}
                    </div>

                    {/* Asset type selector */}
                    <div className="flex items-center gap-3 justify-center">
                        <button
                            onClick={() => setAssetType('EQUITY')}
                            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold text-sm transition-all duration-200 ${
                                assetType === 'EQUITY'
                                    ? 'bg-slate-500 text-white shadow-lg shadow-slate-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            {/* Bar chart icon */}
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            Top 50 INDIAN Companies
                        </button>
                        <button
                            onClick={() => setAssetType('GOLD')}
                            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold text-sm transition-all duration-200 ${
                                assetType === 'GOLD'
                                    ? 'bg-[#fbbf24] text-white shadow-lg shadow-yellow-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            {/* Gold coin icon */}
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Digital Gold
                        </button>
                    </div>
                </div>

                {/* Continue button — desktop: inline bottom; mobile: floating */}
                <div className="hidden sm:block px-6 pb-8">
                    <button
                        onClick={handleContinue}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full h-14 rounded-2xl bg-[#6366f1] text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:bg-[#5558e6] transition-all disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>

                {/* Mobile: floating FAB */}
                <div className="fixed bottom-8 right-6 sm:hidden">
                    <button
                        onClick={handleContinue}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6366f1] text-white shadow-xl shadow-indigo-300 hover:bg-[#5558e6] transition-all disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function GiftPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GiftPageContent />
        </Suspense>
    );
}
