import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact.model';
import { IFeature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  apiRoot: string = 'https://infosafejiapi.azurewebsites.net';
  apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = `${this.apiRoot}/api/Contact`;
  }

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiUrl}/GetContacts`);
  }

  getContactById(id: number): Observable<IContact> {
    return this._http.get<IContact>(`${this.apiUrl}/GetContactById/${id}`);
  }

  getFullContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(`${this.apiUrl}/GetFullContacts`);
  }

  saveContact(value: IContact): Observable<any> {
    return this._http.post(`${this.apiUrl}/SaveContact`, value);
  }

  getFeatureTest(): Observable<IFeature> {
    return this._http.get<IFeature>(`${this.apiUrl}/GetFeatureTest`);
  }
}
