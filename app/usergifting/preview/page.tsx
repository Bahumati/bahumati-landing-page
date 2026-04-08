'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getUser, sendGift, uploadFile } from '@/lib/api';
import { useRequireAuth } from '@/lib/auth';
import { User } from '@/types';

type AttachmentType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | null;

function Avatar({ src, name }: { src?: string; name: string }) {
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    if (src) return <img src={src} alt={name} className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl" />;
    return (
        <div className="h-24 w-24 rounded-full bg-indigo-100 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-[#6366f1]">
            {initials}
        </div>
    );
}

const MOCK_USER: User = { uid: 'mock-preview', name: 'User', mobile: '' };

function GiftPreviewContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('user') || '';
    const amount = parseFloat(searchParams.get('amount') || '0');
    const assetType = (searchParams.get('assetType') as 'GOLD' | 'EQUITY') || 'GOLD';
    const isSelf = searchParams.get('self') === 'true';

    const [targetUser, setTargetUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [giftSent, setGiftSent] = useState(false);
    const [txId, setTxId] = useState('');
    const [giftId, setGiftId] = useState('');
    const [attachmentType, setAttachmentType] = useState<AttachmentType>(null);
    const [message, setMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useRequireAuth();

    useEffect(() => {
        if (!uid) return;
        getUser(uid).then(setTargetUser).catch(() => setTargetUser(MOCK_USER));
    }, [uid]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRecording) interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
        else if (!recordedAudio) setRecordingTime(0);
        return () => clearInterval(interval);
    }, [isRecording, recordedAudio]);

    const confirmGift = async () => {
        setLoading(true);
        try {
            const result = await sendGift({ toUid: uid, amount, assetType });
            setTxId(result.transactionId);
            setGiftId(result.giftId || '');
            setGiftSent(true);
        } catch (err: any) {
            console.error('[sendGift error]', err);
            alert(err?.message || 'Failed to send gift. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const navigateToStatus = (opts: { attachType?: AttachmentType; msg?: string } = {}) => {
        const params = new URLSearchParams({
            tx: txId || 'pending',
            amount: amount.toString(),
            type: assetType,
            rName: targetUser?.name || '',
            rUid: uid,
            rAvatar: targetUser?.avatarUrl || '',
            isSelf: isSelf ? 'true' : 'false',
            ...(opts.attachType ? { attachmentType: opts.attachType } : {}),
            ...(opts.msg ? { message: opts.msg } : {}),
        });
        router.push(`/usergifting/status?${params}`);
    };

    const handleSkip = () => navigateToStatus();

    const handleSendText = () => {
        if (!message.trim()) return;
        navigateToStatus({ attachType: 'TEXT', msg: message });
    };

    const handleSendMedia = async () => {
        setLoading(true);
        try {
            if (attachmentType === 'AUDIO' && recordedAudio) {
                const resp = await fetch(recordedAudio);
                const blob = await resp.blob();
                const file = new File([blob], `audio-${Date.now()}.webm`, { type: blob.type });
                await uploadFile(file);
            } else if ((attachmentType === 'IMAGE' || attachmentType === 'VIDEO') && previewUrl) {
                const resp = await fetch(previewUrl);
                const blob = await resp.blob();
                const ext = attachmentType === 'IMAGE' ? 'jpg' : 'mp4';
                const file = new File([blob], `media-${Date.now()}.${ext}`, { type: blob.type });
                await uploadFile(file);
            }
        } catch {}
        navigateToStatus({ attachType: attachmentType || undefined });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
            recorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setRecordedAudio(url);
                if (audioRef.current) { audioRef.current.src = url; audioRef.current.load(); }
                stream.getTracks().forEach(t => t.stop());
            };
            recorder.start(1000);
            setIsRecording(true);
        } catch {
            alert('Microphone access denied.');
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const togglePlay = async () => {
        if (!audioRef.current || !recordedAudio) return;
        if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
        else { await audioRef.current.play(); setIsPlaying(true); }
    };

    const clearAttachment = () => {
        setAttachmentType(null);
        setRecordedAudio(null);
        setIsRecording(false);
        setRecordingTime(0);
        setPreviewUrl(null);
        setMessage('');
        if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; }
    };

    const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    if (!targetUser) {
        return <div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>;
    }

    const assetLabel = assetType === 'GOLD' ? 'Digital Gold' : 'Top 50 Indian Companies';

    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-8 sm:pb-8 sm:p-4">
            <div className="w-full sm:max-w-sm bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col" style={{ minHeight: 'min(780px, 100vh)' }}>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-14 sm:pt-5 pb-2">
                    <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </button>
                    <button className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10">
                    {/* Recipient */}
                    <div className="mb-8 flex flex-col items-center text-center">
                        <Avatar src={targetUser.avatarUrl} name={targetUser.name || 'U'} />
                        <h1 className="mt-4 text-2xl font-bold text-[#6366f1]">{targetUser.name || 'User'}</h1>
                        <p className="text-xs font-medium text-gray-400 mt-1">UID: {targetUser.uid}</p>
                    </div>

                    {/* Step 1: Confirm gift */}
                    {!giftSent ? (
                        <div className="flex flex-col items-center w-full max-w-xs gap-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-1">{isSelf ? 'Self-gifting' : 'Sending'}</p>
                                <p className="text-4xl font-bold text-gray-900">₹{amount}</p>
                                <p className="text-sm text-gray-400 mt-1">in {assetLabel}</p>
                            </div>
                            <button
                                onClick={confirmGift}
                                disabled={loading}
                                className="w-full h-14 rounded-2xl bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold text-base shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
                            >
                                {loading
                                    ? <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</span>
                                    : isSelf ? 'Confirm Self-Gift' : 'Send Gift'
                                }
                            </button>
                        </div>
                    ) : (
                        /* Step 2: Add message after gift is sent */
                        <div className="flex flex-col items-center w-full gap-6">
                            <div className="flex flex-col items-center">
                                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Gift Sent!</h2>
                                <p className="text-sm text-gray-400">Add a personal touch?</p>
                            </div>

                            {/* Attachment picker */}
                            {!attachmentType && (
                                <div className="flex flex-col items-center gap-6 w-full">
                                    <div className="flex items-center gap-5">
                                        {[
                                            { type: 'TEXT' as const, label: 'Text', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg> },
                                            { type: 'IMAGE' as const, label: 'Photo', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                                            { type: 'VIDEO' as const, label: 'Video', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
                                            { type: 'AUDIO' as const, label: 'Voice', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },
                                        ].map(({ type, label, icon }) => (
                                            <button
                                                key={type}
                                                onClick={() => setAttachmentType(type)}
                                                className="flex flex-col items-center gap-1.5"
                                            >
                                                <div className="h-16 w-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-[#6366f1] hover:border-indigo-200 transition-all shadow-sm">
                                                    {icon}
                                                </div>
                                                <span className="text-xs text-gray-400">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleSkip}
                                        className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors"
                                        disabled={loading}
                                    >
                                        Skip & View Status →
                                    </button>
                                </div>
                            )}

                            {/* Text input */}
                            {attachmentType === 'TEXT' && (
                                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                                    <div className="relative w-full">
                                        <textarea
                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                                            placeholder="Write your message..."
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            autoFocus
                                        />
                                        <button onClick={clearAttachment} className="absolute right-3 top-3 rounded-full p-1 text-gray-300 hover:text-gray-500 hover:bg-gray-200 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleSendText}
                                        disabled={!message.trim() || loading}
                                        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg shadow-indigo-200 hover:bg-[#5558e6] transition-all disabled:opacity-40"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}

                            {/* Audio recording */}
                            {attachmentType === 'AUDIO' && (
                                <div className="flex flex-col items-center gap-5 w-full max-w-xs">
                                    <div className="flex w-full items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm">
                                        <button onClick={clearAttachment} className="text-gray-300 hover:text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div className="flex h-6 items-center gap-0.5 flex-1 mx-3">
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i} className="w-1 rounded-full transition-all duration-300" style={{ height: `${(isRecording || isPlaying) ? Math.max(20, Math.random() * 100) : 20}%`, backgroundColor: (isRecording || isPlaying) ? '#6366f1' : '#e5e7eb' }} />
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 min-w-[36px]">{formatTime(recordingTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {!recordedAudio ? (
                                            !isRecording ? (
                                                <button onClick={startRecording} className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                                    <span className="absolute h-14 w-14 rounded-full border-4 border-red-200 animate-ping" />
                                                    <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                                </button>
                                            ) : (
                                                <button onClick={stopRecording} className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                                    <span className="h-5 w-5 rounded-sm bg-white" />
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button onClick={() => { setRecordedAudio(null); setRecordingTime(0); }} className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                                <button onClick={togglePlay} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg hover:bg-[#5558e6] transition-all">
                                                    {isPlaying
                                                        ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                                        : <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                    }
                                                </button>
                                                <button onClick={handleSendMedia} disabled={loading} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg hover:bg-[#5558e6] transition-all disabled:opacity-50">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
                                </div>
                            )}

                            {/* Image / Video */}
                            {(attachmentType === 'IMAGE' || attachmentType === 'VIDEO') && (
                                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept={attachmentType === 'IMAGE' ? 'image/*' : 'video/*'}
                                        className="hidden"
                                        onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreviewUrl(URL.createObjectURL(f)); }}
                                    />
                                    <div
                                        className="relative flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {previewUrl ? (
                                            attachmentType === 'IMAGE'
                                                ? <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                                : <video src={previewUrl} className="h-full w-full object-cover" controls />
                                        ) : (
                                            <div className="text-center p-8">
                                                <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-xs text-gray-400">Tap to upload {attachmentType === 'IMAGE' ? 'photo' : 'video'}</p>
                                            </div>
                                        )}
                                        <button onClick={(e) => { e.stopPropagation(); clearAttachment(); }} className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-500 hover:bg-white shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleSendMedia}
                                        disabled={loading || !previewUrl}
                                        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg shadow-indigo-200 hover:bg-[#5558e6] transition-all disabled:opacity-40"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GiftPreviewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GiftPreviewContent />
        </Suspense>
    );
}
