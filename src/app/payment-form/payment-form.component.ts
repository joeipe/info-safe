import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentApiService } from '../core/http/payment-api.service';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { MessageService } from 'primeng/api';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'inf-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
  providers: [MessageService]
})
export class PaymentFormComponent implements OnInit {

  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  loading = false;
  paying = false;
  payed = false;

  paymentForm: FormGroup;

  constructor(
    private paymentApiSvc: PaymentApiService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private authService: MsalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const accounts = this.authService.instance.getAllAccounts();
    this.paymentForm = this.formBuilder.group({
      name: [accounts[0].name, [Validators.required]],
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
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Payment failed ${result.error.message}`, life: 3000 });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Payment successful', life: 3000 });
          }
        }

        this.payed = true;
      });
    } else {
      console.log(this.paymentForm);
    }
  }
}
