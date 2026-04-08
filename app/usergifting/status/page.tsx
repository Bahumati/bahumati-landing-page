'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function Avatar({ src, name, size = 'lg' }: { src?: string; name: string; size?: 'lg' }) {
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    if (src) return <img src={src} alt={name} className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg" />;
    return (
        <div className="h-20 w-20 rounded-full bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-[#6366f1]">
            {initials}
        </div>
    );
}

function GiftStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const txId = searchParams.get('tx') || '';
    const amount = parseFloat(searchParams.get('amount') || '0');
    const assetType = (searchParams.get('type') as 'GOLD' | 'EQUITY') || 'GOLD';
    const rName = searchParams.get('rName') || 'User';
    const rUid = searchParams.get('rUid') || '';
    const rAvatar = searchParams.get('rAvatar') || '';
    const isSelf = searchParams.get('isSelf') === 'true';
    const attachmentType = searchParams.get('attachmentType') as 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | null;
    const message = searchParams.get('message') || '';

    const assetLabel = assetType === 'GOLD' ? 'Digital Gold' : 'Top 50 Indian Companies';

    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-8 sm:pb-8 sm:p-4">
            <div className="w-full sm:max-w-sm bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col overflow-hidden" style={{ minHeight: 'min(780px, 100vh)' }}>

                <div className="flex-1 overflow-y-auto px-5 pt-12 sm:pt-8 pb-6">
                    {/* Recipient */}
                    <div className="flex flex-col items-center mb-6">
                        <Avatar src={rAvatar} name={rName} />
                        <h2 className="mt-3 text-xl font-bold text-[#6366f1]">{rName}</h2>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">UID: {rUid}</p>
                    </div>

                    {/* Asset card */}
                    <div className={`mb-5 rounded-2xl p-5 flex flex-col items-center ${assetType === 'GOLD' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                        <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-3 ${assetType === 'GOLD' ? 'bg-yellow-100' : 'bg-slate-100'}`}>
                            {assetType === 'GOLD' ? (
                                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                                    <circle cx="20" cy="20" r="18" fill="#fbbf24" />
                                    <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" dy=".3em">₹</text>
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                            )}
                        </div>
                        <p className="text-xs font-medium text-gray-400 mb-1">{isSelf ? 'Self-Gifted' : 'Gifted'}</p>
                        <p className="text-3xl font-bold text-gray-900">₹{amount}</p>
                        <p className="text-sm text-gray-500 mt-1">{assetLabel}</p>
                    </div>

                    {/* Status card */}
                    <div className="mb-5 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-50">
                            <p className="text-sm font-bold text-gray-900">Payment Status</p>
                        </div>
                        <div className="px-4 py-4">
                            {/* Timeline */}
                            <div className="flex flex-col gap-3">
                                {[
                                    { title: 'Gift Sent', done: true },
                                    { title: 'Delivered', done: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                                            {item.done && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm ${item.done ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>{item.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Attached message */}
                            {attachmentType && (
                                <div className="mt-4 pt-4 border-t border-gray-50">
                                    <p className="text-xs font-bold uppercase text-gray-400 mb-2">Attached Message</p>
                                    {attachmentType === 'TEXT' && message && (
                                        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 italic">&ldquo;{message}&rdquo;</div>
                                    )}
                                    {attachmentType === 'AUDIO' && (
                                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                            <div className="h-10 w-10 rounded-full bg-[#6366f1] flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                            </div>
                                            <div className="flex-1 h-1 rounded-full bg-gray-200"><div className="h-1 w-1/3 rounded-full bg-[#6366f1]" /></div>
                                            <span className="text-xs text-gray-400">Voice</span>
                                        </div>
                                    )}
                                    {(attachmentType === 'IMAGE' || attachmentType === 'VIDEO') && (
                                        <div className="rounded-xl bg-gray-100 h-20 flex items-center justify-center text-xs text-gray-400">
                                            {attachmentType === 'IMAGE' ? 'Image' : 'Video'} Attachment
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Tx details */}
                            <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{isSelf ? 'Self-Gifted to' : 'Gift To'}:</span>
                                    <span className="font-semibold text-gray-900">{rName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">UID:</span>
                                    <span className="font-semibold text-gray-900 text-xs">{rUid}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Transaction ID:</span>
                                    <span className="font-mono text-xs text-gray-700">{txId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App download CTA */}
                    <div className="mb-5 rounded-2xl bg-indigo-50 p-5 text-center">
                        <h3 className="text-base font-bold text-[#6366f1] mb-1">Experience Hassle-free Gifting</h3>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            Download the Bahumati app to chat, send voice messages, and track all your gifts easily.
                        </p>
                        <div className="flex gap-3">
                            <button className="flex-1 h-11 rounded-xl bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-sm">
                                App Store
                            </button>
                            <button className="flex-1 h-11 rounded-xl bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-sm">
                                Play Store
                            </button>
                        </div>
                    </div>

                    {/* Send another */}
                    <div className="text-center">
                        <button
                            onClick={() => router.push('/gift')}
                            className="text-sm text-gray-400 hover:text-[#6366f1] font-medium transition-colors"
                        >
                            Send Another Gift
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function GiftStatusPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GiftStatusContent />
        </Suspense>
    );
}
