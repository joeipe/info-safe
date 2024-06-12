import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentApiService } from '../core/http/payment-api.service';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'inf-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit {

  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  loading = false;
  paying = false;

  paymentForm: FormGroup;

  constructor(
    private paymentApiSvc: PaymentApiService,
    private stripeService: StripeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      name: ['John', [Validators.required]],
      amount: [1, [Validators.required, Validators.pattern(/-?\d+(\.\d{1,2})?/)]],
    });

    this.loading = true;
    this.paymentApiSvc.createPaymentIntent(this.paymentForm.get('amount')?.value).subscribe(pi => {
      this.elementsOptions.clientSecret = pi.clientSecret;
      this.loading = false;
    });
  }

  pay() {
    if (this.paymentForm.valid) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentForm.get('name')?.value
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
    } else {
      console.log(this.paymentForm);
    }
  }
}
