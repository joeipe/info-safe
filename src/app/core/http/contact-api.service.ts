import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IContact } from '../models/contact.model';
import { IFeature } from '../models/feature.model';
import { environment } from "../../../environments/environment";
import { DateHelperService } from '../services/date-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  apiRoot: string = environment.apiRoot;
  apiUrl: string;

  constructor(
    private _http: HttpClient,
    private dateHelperSvc: DateHelperService
  ) {
    this.apiUrl = `${this.apiRoot}/api/Contact`;
  }

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiUrl}/GetContacts`);
  }

  getContactById(id: number): Observable<IContact> {
    return this._http.get<IContact>(`${this.apiUrl}/GetContactById/${id}`)
      .pipe(map(c => {
        c.doB = this.dateHelperSvc.getISOShortDateFormat(c.doB);
        return c;
      }));
  }

  getFullContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiUrl}/GetFullContacts`);
  }

  saveContact(value: IContact): Observable<any> {
    value.doB = this.dateHelperSvc.getStandardDateFormat(value.doB);
    return this._http.post(`${this.apiUrl}/SaveContact`, value);
  }

  getFeatureTest(): Observable<IFeature> {
    return this._http.get<IFeature>(`${this.apiUrl}/GetFeatureTest`);
  }
}
