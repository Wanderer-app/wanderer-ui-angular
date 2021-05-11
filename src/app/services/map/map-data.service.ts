import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteFile } from './route-files';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor(private httpClient: HttpClient) { }

  private urlBase = "assets/geojson/"

  getRoutes(routeFile: RouteFile): Observable<string> {
    return this.httpClient.get<string>(this.urlBase + routeFile)
  }
}

