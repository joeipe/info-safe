import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { FeatureFlagComponent } from './feature-flag/feature-flag.component';
import { AuthDetailsComponent } from './auth-details/auth-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    ContactModifyComponent,
    FeatureFlagComponent,
    AuthDetailsComponent
  ],
  imports: [
    ModulesRoutingModule,
    SharedModule
  ]
})
export class ModulesModule { }
