import { CommentData } from "src/app/common/data/comment-data";
import { RatingData } from "src/app/common/data/rating-data";
import { UserShortData } from "src/app/common/data/user-short-data";
import { FileData } from "src/app/common/data/file-data";
import { LatLng } from "src/app/common/data/latLng";
import { PinType } from "src/app/common/data/pinType";
import { VoteDirection } from "src/app/common/data/vote-direction";
import { UserFullData } from "./user-full-data";

export interface PinData {
    id: number
    creator: UserFullData
    createdAt: Date
    updatedAt: Date
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
    createdAt: Date,
    title: string,
    rating: number
}