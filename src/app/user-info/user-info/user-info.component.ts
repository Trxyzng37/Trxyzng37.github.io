import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Communities } from 'src/app/shared/pojo/pojo/communities';
import { UserProfile } from 'src/app/shared/pojo/pojo/user-profile';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { PresentationService } from 'src/app/shared/services/presentation/presentation.service';
import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
import { SearchUserProfileService } from 'src/app/shared/services/search-user-profile/search-user-profile.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public constructor(
    private searchUserProfileService: SearchUserProfileService,
    private communityService: CommunityService,
    private storageService: StorageService,
    private dateTimeService: DateTimeService,
    public presentationService: PresentationService
  ) {}

  public userInfo: UserProfile = new UserProfile(0,'','','',0,0,'');
  public communities: Communities[] = [];
  public isUser: boolean = false;
  public shownDate: string = "";

  ngOnInit() {
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    const found = window.location.href.match('/user/([A-Za-z0-9]+)')
    let username = "";
    if(found != null) {
      username = found[1];
    }
    this.searchUserProfileService.getUserProfileByName("/get-user-info-by-username", username).subscribe({
      next: (response: UserProfile) => {
        this.userInfo = response;
        this.isUser = uid === this.userInfo.uid;
        this.shownDate = this.dateTimeService.getStringRepresentDateTime(this.userInfo.created_at);
        this.communityService.getCommunityInfoByUid(this.userInfo.uid).subscribe({
          next: (response: Communities[]) => {
            this.communities = response;
          }
        })
      }
    })
  }

  editProfile() {
    window.location.href = "/setting/" + this.userInfo.username;
  }
}
