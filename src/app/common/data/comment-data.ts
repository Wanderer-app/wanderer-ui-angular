import { UserData } from "./user-full-data";
import { VoteDirection } from "./vote-direction";

export interface CommentData {
    id: number,
    author: UserData,
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