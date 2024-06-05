import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptorFunctional, loggingInterceptorFunctional, responseTimeInterceptorFunctional } from './interceptor/functional.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        responseTimeInterceptorFunctional,
        // loadingSpinnerInterceptorFunctional,
        // authInterceptorFunctional,
        // retryInterceptorFunctional,
        loggingInterceptorFunctional,
        errorInterceptorFunctional
      ])
    )
  ]
})
export class CoreModule { }
