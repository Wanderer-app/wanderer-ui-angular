import { NotificationStatus, NotificationType } from "src/app/common/data/notification-data";

export interface ServiceListingResponse<T> {
    isSuccessful: boolean,
    message: string,
    resultSize: number,
    batchNumber: number,
    data: T[]
}

export interface ServiceResponse<T> {
    isSuccessful: boolean,
    message: string,
    data?: T
}

export interface BackEndUserDataResponse {
    _id: string
    name: string,
    surname: string,
    age: string,
    location: string,
    privilege: number,
    notifications?: BackEndNotificationResponse[]
}

export interface BackEndNotificationResponse {
    _id: string,
    created_at: string,
    reciever: string,
    redirect_url: string,
    sender: string,
    status: NotificationStatus,
    text: string,
    type: NotificationType
}