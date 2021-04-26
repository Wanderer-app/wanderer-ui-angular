import { Observable } from "rxjs";
import { CommentData } from "src/app/common/data/comment-data";

export interface CommentableContentService {
    getComments(id: number): Observable<CommentData[]>,
    addComment(id: number, text: string): Observable<CommentData>
}