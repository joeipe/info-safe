import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { FeatureFlagComponent } from './feature-flag/feature-flag.component';
import { AuthDetailsComponent } from './auth-details/auth-details.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GallerySasComponent } from './gallery-sas/gallery-sas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact/:id', component: ContactModifyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'payment', component: PaymentFormComponent },
  { path: 'featureflag', component: FeatureFlagComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallerysas', component: GallerySasComponent },
  { path: 'auth', component: AuthDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
