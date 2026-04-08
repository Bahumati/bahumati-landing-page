'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { requestOtp, verifyOtp, getMe } from '@/lib/api';

const RESEND_COOLDOWN = 30;

function LoginContent() {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [resendSuccess, setResendSuccess] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextUrl = searchParams.get('next') || '/';
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isAuthenticated) router.replace(nextUrl);
    }, [isAuthenticated, router, nextUrl]);

    // Countdown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        cooldownRef.current = setInterval(() => {
            setCooldown(c => {
                if (c <= 1) { clearInterval(cooldownRef.current!); return 0; }
                return c - 1;
            });
        }, 1000);
        return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
    }, [cooldown]);

    const startCooldown = () => setCooldown(RESEND_COOLDOWN);

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) { setError('Enter a valid mobile number'); return; }
        setLoading(true);
        setError('');
        try {
            await requestOtp(mobile);
            setStep('OTP');
            startCooldown();
            otpRefs.current[0]?.focus();
        } catch {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length < 4) { setError('Enter the complete OTP'); return; }
        setLoading(true);
        setError('');
        try {
            const data = await verifyOtp(mobile, otpValue);
            // Store token before getMe() so authHeaders() can read it
            localStorage.setItem('token', data.token);
            const user = await getMe();
            login(data.token, user);
            router.replace(nextUrl);
        } catch {
            localStorage.removeItem('token');
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0 || resending) return;
        setResending(true);
        setError('');
        setResendSuccess(false);
        try {
            await requestOtp(mobile);
            setOtp(['', '', '', '']);
            setResendSuccess(true);
            startCooldown();
            otpRefs.current[0]?.focus();
            // Clear success message after 3 seconds
            setTimeout(() => setResendSuccess(false), 3000);
        } catch {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setResending(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 3) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-slate-50 flex items-center justify-center p-0 sm:p-6">
            <div className="w-full sm:max-w-sm bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col min-h-screen sm:min-h-0 overflow-hidden">

                {/* Top illustration */}
                <div className="flex flex-1 sm:flex-none items-center justify-center px-8 pt-16 sm:pt-10 pb-4">
                    <div className="relative w-48 h-48 sm:w-40 sm:h-40">
                        <div className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center">
                            <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="30" width="60" height="40" rx="4" fill="#e0e7ff" />
                                <rect x="10" y="28" width="60" height="14" rx="3" fill="#6366f1" />
                                <path d="M40 28 C40 28 30 14 22 18 C14 22 20 30 28 30 C34 30 40 28 40 28Z" fill="#818cf8" />
                                <path d="M40 28 C40 28 50 14 58 18 C66 22 60 30 52 30 C46 30 40 28 40 28Z" fill="#818cf8" />
                                <rect x="36" y="28" width="8" height="42" rx="2" fill="#4f46e5" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Form card */}
                <div className="w-full bg-white px-8 pt-6 pb-10 sm:pb-8">
                    {step === 'OTP' && (
                        <button
                            onClick={() => { setStep('MOBILE'); setOtp(['', '', '', '']); setError(''); setCooldown(0); }}
                            className="mb-4 flex items-center text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    )}

                    <h1 className="text-center text-3xl font-bold text-[#6366f1] mb-2">
                        {step === 'MOBILE' ? 'Sign In' : 'Verify OTP'}
                    </h1>
                    <p className="text-center text-gray-400 mb-8 text-sm leading-relaxed">
                        {step === 'MOBILE'
                            ? 'Gift and Self Gift Bahumati units to anyone'
                            : `Enter the 4-digit OTP sent to +91 ${mobile}`}
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    {/* Resend success message */}
                    {resendSuccess && (
                        <div className="mb-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-600 text-center">
                            OTP sent successfully!
                        </div>
                    )}

                    {step === 'MOBILE' ? (
                        <form onSubmit={handleRequestOtp} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                                    Mobile Number
                                </label>
                                <div className="flex rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                                    <span className="flex items-center pl-4 pr-2 text-gray-500 font-medium text-sm select-none">+91</span>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="98765 43210"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        required
                                        className="flex-1 bg-transparent h-14 pr-4 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || mobile.length < 10}
                                className="w-full h-14 rounded-2xl bg-[#6366f1] hover:bg-[#5558e6] text-white text-base font-semibold shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                        Sending OTP...
                                    </span>
                                ) : 'Continue'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-center text-sm font-semibold text-gray-700 mb-5">
                                    Enter your OTP
                                </label>
                                <div className="flex justify-center gap-4">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { otpRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="h-14 w-14 rounded-2xl border-2 border-gray-200 bg-gray-50 text-center text-2xl font-bold text-gray-900 focus:border-[#6366f1] focus:bg-indigo-50 focus:outline-none transition-all"
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.join('').length < 4}
                                className="w-full h-14 rounded-2xl bg-[#6366f1] hover:bg-[#5558e6] text-white text-base font-semibold shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                        Verifying...
                                    </span>
                                ) : 'Verify & Sign In'}
                            </button>

                            {/* Resend row */}
                            <div className="text-center">
                                {cooldown > 0 ? (
                                    <p className="text-sm text-gray-400">
                                        Resend OTP in{' '}
                                        <span className="font-semibold text-[#6366f1] tabular-nums">{cooldown}s</span>
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        Didn&apos;t receive?{' '}
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            disabled={resending}
                                            className="text-[#6366f1] font-semibold hover:underline disabled:opacity-50"
                                        >
                                            {resending ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    </p>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <LoginContent />
        </Suspense>
    );
}
