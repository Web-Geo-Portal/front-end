import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { BasemapComponent } from './basemap/basemap.component';
import { AuthGuard } from './auth.gaurd';
import { UserManagementComponent } from './user-management/user-management.component';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'user-management',component:UserManagementComponent,canActivate: [AuthGuard]},
  {path:'base-map',component:BasemapComponent,canActivate: [AuthGuard]},
  {path:'register',component:RegisterUserComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
