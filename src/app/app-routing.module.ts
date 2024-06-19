import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppErrorComponent } from './pages/app-error.component';
import { AppAccessDeniedComponent } from './pages/app-access-denied.component';

const routes: Routes = [
  { path: 'error', component: AppErrorComponent },
  { path: 'accessdenied', component: AppAccessDeniedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
