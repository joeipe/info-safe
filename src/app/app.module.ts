import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppErrorComponent } from './pages/app-error.component';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

const msalConfig = { // MSAL Configuration
  auth: {
    clientId: "8453dda4-8e94-4928-8655-9a29018d2eea",
    authority: "https://login.microsoftonline.com/031162b7-774f-40b2-a8a5-8b979557e49a/v2.0",
    redirectUri: environment.azureAD.redirectUri,
    // postLogoutRedirectUri: "http://localhost:4200/"
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AppErrorComponent
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
          scopes: ['user.read'],
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      })
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
