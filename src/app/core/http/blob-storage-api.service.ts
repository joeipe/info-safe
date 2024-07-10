import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlob, IBlobRequest, IBlobResponse } from '../models/blob.model';

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

  public uploadFile(frmData: FormData): Observable<IBlobResponse> {
    return this._http.post<IBlobResponse>(`${this.apiUrl}/UploadFile`, frmData);
  }

  listFiles(prefix?: string): Observable<IBlob[]> {
    if (prefix) {
      return this._http.get<IBlob[]>(`${this.apiUrl}/ListFiles/${prefix}`);
    } else {
      return this._http.get<IBlob[]>(`${this.apiUrl}/ListFiles`);
    }
  }

  downloadFile(fileName: string): Observable<IBlob> {
    let blobRequest: IBlobRequest = {
      fileName: encodeURIComponent(fileName)
    }
    return this._http.post<IBlob>(`${this.apiUrl}/DownloadFile`, blobRequest);
  }

  deleteFile(fileName: string): Observable<IBlobResponse> {
    let blobRequest: IBlobRequest = {
      fileName: encodeURIComponent(fileName)
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.request<IBlobResponse>('delete', `${this.apiUrl}/DeleteFile`,
      {
        headers: headers,
        body: blobRequest
      });
  }

  updateMetadata(blobRequest: IBlobRequest): Observable<any> {
    blobRequest.fileName = encodeURIComponent(blobRequest.fileName)
    return this._http.post(`${this.apiUrl}/UpdateMetadata`, blobRequest);
  }
}
