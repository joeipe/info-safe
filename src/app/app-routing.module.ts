import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppErrorComponent } from './pages/app-error.component';

const routes: Routes = [
  { path: 'error', component: AppErrorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
