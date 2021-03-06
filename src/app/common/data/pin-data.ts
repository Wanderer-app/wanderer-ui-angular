import { CommentData } from "src/app/common/data/comment-data";
import { RatingData } from "src/app/common/data/rating-data";
import { FileData } from "src/app/common/data/file-data";
import { LatLng } from "src/app/common/data/latLng";
import { PinType } from "src/app/common/data/pinType";
import { VoteDirection } from "src/app/common/data/vote-direction";
import { UserData } from "./user-full-data";

export interface PinData {
    id: number
    creator: UserData
    createdAt: string
    updatedAt: string
    isActive: boolean
    isRemoved: boolean
    isRelevant: boolean
    rating: RatingData
    commentsNumber: number
    commentsPreview: CommentData[]
    routeCode: string
    title: string
    text: string
    attachedFile?: FileData
    type: PinType
    location: LatLng
    userVoteDirection?: VoteDirection
}

export interface PinShortData {
    id: number,
    routeCode: string,
    location: LatLng,
    type: PinType,
    createdAt: string,
    title: string,
    rating: number
}