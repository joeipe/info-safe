import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppErrorComponent } from './pages/app-error.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { msalConfig, protectedResources } from './core/auth/auth-config';
import { AppAccessDeniedComponent } from './pages/app-access-denied.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    AppErrorComponent,
    PaymentFormComponent,
    AppAccessDeniedComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    ModulesModule,

    AppRoutingModule,

    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: protectedResources.todoListApi.scopes,
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
        ])
      }),

    NgxStripeModule.forRoot(environment.stripe.publicKey)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
