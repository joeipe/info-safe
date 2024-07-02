import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlob } from '../models/blob.model';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageApiService {
  apiRoot: string = environment.apiRoot;
  apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = `${this.apiRoot}/api/BlobStorage`;
  }

  listFiles(prefix?: string): Observable<IBlob[]> {
    if (prefix) {
      return this._http.get<IBlob[]>(`${this.apiUrl}/ListFiles/${prefix}`);
    } else {
      return this._http.get<IBlob[]>(`${this.apiUrl}/ListFiles`);
    }
  }

  downloadFile(fileName: string): Observable<IBlob> {
    fileName = encodeURIComponent(fileName)
    return this._http.get<IBlob>(`${this.apiUrl}/DownloadFile/${fileName}`);
  }
}
