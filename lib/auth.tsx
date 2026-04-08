'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useRouter, usePathname } from 'next/navigation';
import { getMe } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('auth_user');

            if (token) {
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch {}
                }
                try {
                    const freshUser = await getMe();
                    setUser(freshUser);
                    localStorage.setItem('auth_user', JSON.stringify(freshUser));
                } catch {
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth_user');
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [router]);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth_user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export function useRequireAuth(redirectUrl?: string) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            const next = redirectUrl || pathname;
            router.push(`/login?next=${encodeURIComponent(next)}`);
        }
    }, [user, isLoading, router, pathname, redirectUrl]);

    return { user, isLoading };
}
