import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PortalComponent } from './portal/portal.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'portal', component: PortalComponent, canActivate: [AuthGuard]}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
