import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentIntent } from '@stripe/stripe-js';

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

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this._http.post<PaymentIntent>(`${this.apiUrl}/CreatePaymentIntent`, { amount });
  }
}
