import { Component } from '@angular/core';
import { SearchUserProfileService } from 'src/app/shared/services/search-user-profile/search-user-profile.service';
import { UserProfile } from 'src/app/shared/pojo/pojo/user-profile';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCommentsService } from 'src/app/view-detail-post/view-detail-post/service/get-comments/get-comments.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  public constructor(
    private searchUserProfileService: SearchUserProfileService,
    private storageService: StorageService,
    private getCommentService: GetCommentsService,
    private activeRoute: ActivatedRoute,
    private darkmodeSerive: DarkModeService,
    private checkRefreshTokenService: CheckRefreshTokenService
  ) {}

  public userInfo: UserProfile = new UserProfile(0,'','','',0,0,'');
  public comments: Comment[] = [];
  public searchOption: string = "posts";
  public sort_option: string = "New";
  public isSortOptionShow: boolean = false;
  public isOwner: boolean = false;
  public isLoad: boolean = false;

  ngOnInit() {
    this.darkmodeSerive.useDarkMode();
    this.checkRefreshTokenService.runCheckRefreshTokenWithoutNotification();
    const username = this.activeRoute.snapshot.params['username'];
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.searchUserProfileService.getUserProfileByName("/get-user-info-by-username", username).subscribe({
      next: (response: UserProfile) => {
        this.userInfo = response;
        this.isOwner = uid == this.userInfo.uid;
        this.getCommentsByUid("new");
      }
    })
  }

  count=0;
  selectSearchOption(option: string) {
    this.searchOption = option;
    if(option == "wait_for_approve" || option == "saved") {
        this.isLoad = true;
    }
  }

  loadApprove(event: Event) {
    this.isLoad = false;
  }

  selectSort(sort_type: string) {
    this.sort_option = sort_type;
    this.isSortOptionShow = !this.isSortOptionShow;
    let sort_option = "";
    switch(sort_type) {
      case "Hot":
        sort_option = "hot";
        break;
      case "New":
        sort_option = "new";
        break;
      case "Top today":
        sort_option = "top_day";
        break; 
      case "Top this week":
        sort_option = "top_week";
        break;   
      case "Top this month":
        sort_option = "top_month";
        break;
      case "Top this year":
        sort_option = "top_year";
        break;
      case "Top all time":
        sort_option = "top_all_time";
        break;                      
    }
    this.getCommentsByUid(sort_option);
  }

  showSortOption() {
    this.isSortOptionShow = !this.isSortOptionShow;
  }

  getCommentsByUid(sort_type: string) {
    this.getCommentService.getCommentsByUser(this.userInfo.uid, sort_type).subscribe({
      next: (response: Comment[]) => {
        this.comments = response;
      }
    })
  }
}
