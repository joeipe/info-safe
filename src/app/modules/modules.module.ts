import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';



@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    ContactModifyComponent,
    PaymentFormComponent
  ],
  imports: [
    ModulesRoutingModule,
    SharedModule
  ]
})
export class ModulesModule { }
