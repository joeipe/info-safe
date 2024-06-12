import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentApiService } from '../../core/http/payment-api.service';

@Component({
  selector: 'inf-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private paymentApiSvc: PaymentApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() { }
}
