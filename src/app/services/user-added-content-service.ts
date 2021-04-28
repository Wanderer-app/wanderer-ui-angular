import { Observable } from "rxjs";
import { ReportReason } from "../common/data/report-reason";

export interface UserAddedContentService {
    activate(id: number): Observable<boolean>
    remove(id: number): Observable<boolean>
    report(id: number, reason: ReportReason): Observable<boolean>
}