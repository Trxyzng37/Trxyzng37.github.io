import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { SigninComponent } from './signin/components/signin/signin.component';
import { SignupComponent } from './signup/components/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/components/home/home.component';
import { ForgotPasswordComponent } from './forgot-password/components/forgot-password/forgot-password.component';
import { PassCodeComponent } from './pass-code/components/pass-code/pass-code.component';
import { ChangePasswordComponent } from './change-password/components/change-password/change-password.component';
import { ConfirmEmailComponent } from './signup/components/confirm-email/confirm-email.component';
// import { signinGuard } from './signin/guards/signin.guard';
import { TestComponent } from './test/test.component';
import { PostLinkComponent } from './post-link/component/post-link/post-link.component';
import { PostMainComponent } from './post-main/component/post-main/post-main.component';
import { PostLinkListComponent } from './post-link-list/component/post-link-list/post-link-list.component';

const routes: Routes = [
  // { path: 'signin', component: SigninComponent, canActivate: mapToCanActivate([signinGuard])},
  { path: 'signin', title: 'sign-in', component: SigninComponent},
  { path: 'signup', title: 'sign-up', component: SignupComponent},
  { path: 'forgot-password', title: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'pass-code', title: 'enter-passcode', component: PassCodeComponent},
  { path: 'change-password', title: 'change-password', component: ChangePasswordComponent},
  { path: 'check-confirm-email-passcode', title: 'check-confirm-email-passcode', component: ConfirmEmailComponent },
  { path: '', title: 'home', component: HomeComponent, 
    children: [
      {path: 'test', component: TestComponent}, 
      {path: '', component: PostMainComponent,
      children: [
        {path: '', title: 'trxyzng', component: PostLinkListComponent},
        {path: 'id/:post_id', title: 'post-id', component: PostLinkComponent}
      ]
      },
    ]
  },
  { path: 'test', title: 'test', component: TestComponent },
  { path: 'error', title:'error', component: ErrorComponent },
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


