export interface NotificationData {
    id: number,
    forUser: number,
    text: string,
    redirectUrl: string,
    createdAt: string
    type: NotificationType,
    status: NotificationStatus
}

export enum NotificationType {
    COMMENT = 'COMMENT',
    REPLY = 'REPLY',
    RATING = 'RATING',
    CONTENT_STATUS_CHANGE = 'CONTENT_STATUS_CHANGE'
}

export enum NotificationStatus {
    SEEN = 'SEEN',
    UNSEEN = 'UNSEEN',
    OPENED = 'OPENED'
}