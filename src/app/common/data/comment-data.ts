import { RatingData } from "./rating-data";
import { UserShortData } from "./user-short-data";
import { VoteDirection } from "./vote-direction";

export interface CommentData {
    id: number,
    author: UserShortData,
    createdAt: string,
    updatedAt: string,
    text: string,
    rating: number,
    isActive: boolean,
    isRemoved: boolean,
    responseNumber: number,
    responsesPreview: CommentData[],
    userVoteDirection?: VoteDirection
}