import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureApiService {
  apiRoot: string = environment.apiRoot;
  apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = `${this.apiRoot}/api/Feature`;
  }

  getFeatureTest(): Observable<IFeature> {
    return this._http.get<IFeature>(`${this.apiUrl}/getFeatureTest`);
  }
}
