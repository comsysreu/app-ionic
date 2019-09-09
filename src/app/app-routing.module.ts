import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: './pages/about/about.module#AboutPageModule', canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule', canActivate: [AuthGuard] },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule', canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
