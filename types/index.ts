export interface User {
    uid: string;
    name: string;
    mobile: string;
    avatarUrl?: string;
}

export interface RecentUser extends User {
    lastGiftedAt?: string;
}

export interface GiftTransaction {
    id: string;
    amount: number;
    assetType: 'GOLD' | 'EQUITY';
    status: 'INITIATED' | 'PROCESSED' | 'SENT' | 'FAILED' | 'DELIVERED';
    recipientName: string;
    recipientUid?: string;
    recipientAvatar?: string;
    timestamp: string;
    message?: string;
    attachmentType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO';
    attachmentUrl?: string;
    isSelfGift?: boolean;
    timeline: {
        status: 'COMPLETED' | 'CURRENT' | 'PENDING' | string;
        timestamp: string;
        title: string;
        description?: string;
    }[];
}
