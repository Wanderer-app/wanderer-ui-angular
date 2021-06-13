import { CommentData } from "./comment-data";
import { FileData } from "./file-data";
import { RatingData } from "./rating-data";
import { UserContentType } from "./user-content-type";
import { UserData } from "./user-full-data";
import { VoteDirection } from "./vote-direction";

export interface DiscussionElement {
    id: number,
    creator: UserData,
    createdAt: string,
    updatedAt: string,
    isActive: boolean,
    isRemoved: boolean,
    ratingData?: RatingData,
    commentsPreview: CommentData[],
    commentsAmount: number,
    routeCode: string,
    content: string,
    attachedFiles: FileData[],
    type: UserContentType,
    userVoteDirection?: VoteDirection
    highlighted?: boolean
}

export interface PollContent {
    question: string,
    answers: PollAnswerData[]
}

export interface PollAnswerData {
    answerId: number,
    title: string,
    answererIds: number[],
    percentage: number
}
