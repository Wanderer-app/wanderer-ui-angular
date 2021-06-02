import { Observable } from "rxjs";
import { ReportReason } from "../common/data/report-reason";

export interface UserAddedContentService<T> {
    activate(id: number): Observable<T>
    remove(id: number): Observable<T>
    report(id: number, reason: ReportReason): Observable<T>
}