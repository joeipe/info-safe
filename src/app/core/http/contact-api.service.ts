import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact.model';
import { IFeature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  apiRoot: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiRoot = 'https://infosafejiapi.azurewebsites.net' + '/api/Contact';
  }

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiRoot}/GetContacts`);
  }

  getContactById(id: number): Observable<IContact> {
    return this._http.get<IContact>(`${this.apiRoot}/GetContactById/${id}`);
  }

  getFullContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiRoot}/GetFullContacts`);
  }

  saveContact(value: IContact): Observable<any> {
    return this._http.post(`${this.apiRoot}/SaveContact`, value);
  }

  getFeatureTest(): Observable<IFeature> {
    return this._http.get<IFeature>(`${this.apiRoot}/GetFeatureTest`);
  }
}
