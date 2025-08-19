import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MlfApplicationComponent } from './components/mlf-application/mlf-application.component';
import { UiShowcaseComponent } from './components/ui/ui-showcase.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: MlfApplicationComponent },
  { path: 'ui-showcase', component: UiShowcaseComponent },
  { path: '**', redirectTo: '/login' }
];
