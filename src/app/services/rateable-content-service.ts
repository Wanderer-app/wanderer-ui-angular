import { Observable } from "rxjs";
import { RatingData } from "src/app/common/data/rating-data";

export interface RateableContentService {
    upVote(id: number): Observable<RatingData>,
    downVote(id: number): Observable<RatingData>,
    removeVote(id: number): Observable<RatingData>,
}