import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignupComponent } from './signup/components/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http'
import { SigninComponent } from './signin/components/signin/signin.component';
import { HomeComponent } from './home/components/home/home.component';
import { ForgotPasswordComponent } from './forgot-password/components/forgot-password/forgot-password.component';
import { PassCodeComponent } from './pass-code/components/pass-code/pass-code.component';
import { ChangePasswordComponent } from './change-password/components/change-password/change-password.component';
import { ConfirmEmailComponent } from './signup/components/confirm-email/confirm-email.component';
import { CreatePostComponent } from './create-post/create-post/component/create-post.component';
import { PostLinkComponent } from './post-link/post-link/component/post-link.component';
import { PostLinkListComponent } from './post-link-list/component/post-link-list/post-link-list.component';
import { PostMainComponent } from './post-main/component/post-main/post-main.component';
import { RecentVisitedPostComponent } from './recent-visited-post/component/recent-visited-post/recent-visited-post.component';
import { NavigationBarComponent } from './navigation_bar/component/navigation-bar/navigation-bar.component';
import { HeaderBarComponent } from './header_bar/component/header-bar/header-bar.component';
import { QuillModule } from 'ngx-quill';
import { InViewportModule } from 'ng-in-viewport';
import { SafeHtmlPipe } from './shared/pipe/safe-html';
import { ImgUploadedComponent } from './create-post/img_uploaded/component/img-uploaded/img-uploaded.component';
import { ImgCaptionComponent } from './create-post/img-caption/img-caption/img-caption.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditorViewComponent } from './post-link/editor/component/editor-view/editor-view.component';
import { ImageViewComponent } from './post-link/image-view/component/image-view/image-view.component';
import { LinkViewComponent } from './post-link/link-review/component/link-view/link-view.component';
import { ViewDetailPostComponent } from './view-detail-post/view-detail-post/component/view-detail-post.component';
import { PostComponent } from './view-detail-post/view-post/component/view-post/view-post.component';
import { CommentComponent } from './comment/component/comment/comment.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditPostComponent } from './edit-post/edit-post/component/edit-post.component';
import { EditEditorPostComponent } from './edit-post/edit-editor-post/component/edit-editor-post.component';
import { EditImgPostComponent } from './edit-post/edit-img-post/component/edit-img-post.component';
import { EditLinkPostComponent } from './edit-post/edit-link-post/component/edit-link-post.component';
import { CreateCommunityComponent } from './create-community/component/create-community.component';
import { CommunityInfoComponent } from './community-info/community-info/community-info.component';
import { EditCommunityComponent } from './edit-community/component/edit-community.component';
import { SearchPostViewComponent } from './search-page/post/search-post-view/search-post-view.component';
import { SearchResultsComponent } from './search-page/search-results/search-results.component';
import { SearchCommunityViewComponent } from './search-page/search-community-view/search-community-view/search-community-view.component';
import { SearchPeopleViewComponent } from './search-page/search-people-view/search-people-view/search-people-view.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { PostViewComponent } from './user-profile/post-view/post-view/post-view.component';
import { UserInfoComponent } from './user-info/user-info/user-info.component';
import { EditUserInfoComponent } from './edit-user-profile/edit-user-info/edit-user-info.component';
import { CommentViewComponent } from './user-profile/comment-view/comment-view/comment-view.component';
import { VideoViewComponent } from './post-link/video-view/video-view/video-view.component';
import { EditVideoViewComponent } from './edit-post/edit-video-post/edit-video-view/edit-video-view.component';
import { BackButtonComponent } from './shared/component/back-button/back-button.component';
import { ChooseUsernameComponent } from './choose-username/choose-username/choose-username.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    ForgotPasswordComponent,
    HomeComponent,
    PassCodeComponent,
    ChangePasswordComponent,
    ConfirmEmailComponent,
    CreatePostComponent,
    PostLinkComponent,
    PostMainComponent,
    RecentVisitedPostComponent,
    NavigationBarComponent,
    HeaderBarComponent,
    PostLinkListComponent,
    ImgUploadedComponent,
    ImgCaptionComponent,
    EditorViewComponent,
    ImageViewComponent,
    LinkViewComponent,
    ViewDetailPostComponent,
    PostComponent,
    CommentComponent,
    EditEditorPostComponent,
    EditImgPostComponent,
    EditPostComponent,
    EditLinkPostComponent,
    CreateCommunityComponent,
    CommunityInfoComponent,
    EditCommunityComponent,
    SearchPostViewComponent,
    SearchResultsComponent,
    SearchCommunityViewComponent,
    SearchPeopleViewComponent,
    UserProfileComponent,
    PostViewComponent,
    UserInfoComponent,
    EditUserInfoComponent,
    CommentViewComponent,
    VideoViewComponent,
    EditVideoViewComponent,
    BackButtonComponent,
    ChooseUsernameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
    BrowserAnimationsModule,
    InViewportModule,
    SafeHtmlPipe,
    EditorModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
