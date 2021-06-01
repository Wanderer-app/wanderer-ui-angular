export interface FileData {
    externalId: string,
    fileType: FileType,
}

export enum FileType {
    IMAGE = "IMAGE",
    OTHER = "OTHER"
}