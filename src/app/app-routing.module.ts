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
import { CreatePostComponent } from './create-post/create-post/component/create-post.component';
import { PostMainComponent } from './post-main/component/post-main/post-main.component';
import { PostLinkListComponent } from './post-link-list/component/post-link-list/post-link-list.component';
import { EditorViewComponent } from './post-link/editor/component/editor-view/editor-view.component';
import { ViewDetailPostComponent } from './view-detail-post/view-detail-post/component/view-detail-post.component';
import { EditPostComponent } from './edit-post/edit-post/component/edit-post.component';
import { CreateCommunityComponent } from './create-community/component/create-community.component';
import { EditCommunityComponent } from './edit-community/component/edit-community.component';
import { SearchResultsComponent } from './search-page/search-results/search-results.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { EditUserInfoComponent } from './edit-user-profile/edit-user-info/edit-user-info.component';
import { ChooseUsernameComponent } from './choose-username/choose-username/choose-username.component';
import { SignInGuard } from './shared/guard/Signin.guard';
import { RefreshTokenGuard } from './shared/guard/refresh-token.guard';
import { SignUpGuard } from './shared/guard/Signup.guard';
import { ConfirmEmailGuard } from './shared/guard/confirm-email.guard';
import { ChooseUsernameGuard } from './shared/guard/choose-username.guard';
import { ChangePasswordGuard } from './shared/guard/change-password.guard';
import { ChangePasswordEmailGuard } from './shared/guard/change-password-email.guard';

const routes: Routes = [
  {path: '', redirectTo: 'popular', pathMatch: 'full'},
  { path: 'goole-authentication-callback', component: SigninComponent},
  { path: 'signin', component: SigninComponent, canActivate: mapToCanActivate([SignInGuard])},
  { path: 'signup', title: 'sign-up', component: SignupComponent, canActivate: mapToCanActivate([SignUpGuard])},
  { path: 'check-sign-up-passcode', title: 'check-sign-up-passcode', component: ConfirmEmailComponent, canActivate: mapToCanActivate([ConfirmEmailGuard])},
  { path: 'choose-username', component: ChooseUsernameComponent, canActivate: mapToCanActivate([ChooseUsernameGuard])},
  { path: 'forgot-password', title: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'forgot-password-pass-code', title: 'enter-passcode', component: PassCodeComponent, canActivate: mapToCanActivate([ChangePasswordEmailGuard])},
  { path: 'change-password', title: 'change-password', component: ChangePasswordComponent, canActivate: mapToCanActivate([ChangePasswordGuard])},
  { path: 'create-post', component: CreatePostComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
  { path: 'create-post?cid=:community_id', component: CreatePostComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
  { path: '', title: 'home', component: HomeComponent, 
    children: [
      { path: '', component: PostMainComponent,
      children: [
        {path: 'home', title: 'home', component: PostLinkListComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
        {path: 'popular', title: 'popular', component: PostLinkListComponent},
        {path: 'r/:community_id', title: 'trxyzng', component: PostLinkListComponent},
        {path: 'edit-post/:post_id', component: EditPostComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
        {path: 'post/:post_id', title: 'view-post', component: ViewDetailPostComponent},
        {path: 'control-posts/:community_id', component: PostLinkListComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
        {path: 'search/:text', component: SearchResultsComponent},
        {path: 'user/:username', component: UserProfileComponent},
        {path: 'setting/:username', component: EditUserInfoComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
        {path: 'edit-community/:community_id', component: EditCommunityComponent, canActivate: mapToCanActivate([RefreshTokenGuard])},
      ]
      }
    ]
  },

  { path: 'error', title:'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


