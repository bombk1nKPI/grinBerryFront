import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TodoComponent } from './pages/todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    {
       path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
         component: AboutComponent,
       }, 
       {
        path: 'profile',
         component: ProfileComponent,
       },
       {
        path: 'todo',
        component: TodoComponent,
       }
    ],
  },{
    path: '',
    component: BlankComponent,
    children: [
    {
       path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
         component: SignupComponent,
       } 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
