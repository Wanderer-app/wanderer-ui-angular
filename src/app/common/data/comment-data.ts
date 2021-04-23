import { RatingData } from "./rating-data";
import { UserShortData } from "./user-short-data";
import { VoteDirection } from "./vote-direction";

export interface CommentData {
    id: number,
    author: UserShortData,
    createdAt: Date,
    updatedAt: Date,
    text: string,
    rating: RatingData,
    isActive: Boolean,
    isRemoved: Boolean,
    responseNumber: number,
    responsesPreview: CommentData[],
    userVoteDirection?: VoteDirection
}