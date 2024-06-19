import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';

export const responseTimeInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  return next(req).pipe(
    finalize(() => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(`Request to ${req.url} took ${responseTime}ms`);
    })
  );
};

export const authInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  let authToken = localStorage.getItem('webApiAccessToken');

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};

export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  console.log('Request URL: ' + req.url);
  return next(req);
};

export const errorInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('http Interceptor Functional Error:', error);
      if (error && (error.status === 401 || error.status === 403)) {
        router.navigate(['/accessdenied']);
      } else {
        router.navigate(['/error']);
      }
      return throwError(() => error);
    })
  );
};