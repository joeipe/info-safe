import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFunctional, errorInterceptorFunctional, loggingInterceptorFunctional, responseTimeInterceptorFunctional } from './interceptor/functional.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        responseTimeInterceptorFunctional,
        authInterceptorFunctional,
        loggingInterceptorFunctional,
        errorInterceptorFunctional
      ])
    )
  ]
})
export class CoreModule { }
