import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClaim } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  apiRoot: string = environment.apiRoot;
  apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = `${this.apiRoot}/api/Auth`;
  }

  getClaims(): Observable<IClaim[]> {
    return this._http.get<IClaim[]>(`${this.apiUrl}/GetClaims`);
  }
}
