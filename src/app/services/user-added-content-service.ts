import { Observable } from "rxjs";

export interface UserAddedContentService {
    activate(id: number): Observable<boolean>
    remove(id: number): Observable<boolean>
    report(id: number): Observable<boolean>
}