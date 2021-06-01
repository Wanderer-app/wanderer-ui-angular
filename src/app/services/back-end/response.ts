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