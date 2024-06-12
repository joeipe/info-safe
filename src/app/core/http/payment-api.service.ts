import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaymentResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {
  apiRoot: string = environment.apiRoot;
  apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = `${this.apiRoot}/api/Payment`;
  }

  createPaymentIntent(amount: number): Observable<IPaymentResponse> {
    return this._http.post<IPaymentResponse>(`${this.apiUrl}/CreatePaymentIntent`, { amount });
  }
}
